const functions = require("firebase-functions");
// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
const serviceAccount = require("./key.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://casper-51987-default-rtdb.firebaseio.com"
});

const db = admin.database();

const express = require('express');
const cors = require('cors');

const app = express();

// Automatically allow cross-origin requests
app.use(cors({origin: true}));


// build multiple CRUD interfaces:
app.post('/', (req, res) => {
    let ref
    const intent = req.body.queryResult.intent.displayName
    switch (intent) {
        case 'esportes':
            ref = db.ref("noticias/esportes");
            break
        case 'politica':
            ref = db.ref("noticias/politica");
            break
        case 'entretenimento':
            ref = db.ref("noticias/entretenimento");
            break
        case 'famosos':
            ref = db.ref("noticias/famosos")
            break
        default:
            throw new Error("Tipo de intent inválido")

    }

    ref.once("value", function (snapshot) {
        let noticias = snapshot.val()

        if (!noticias || Object.keys(noticias).length === 0) {
            res.send(
                {
                    "fulfillmentMessages": [
                        {
                            "payload": {
                                "facebook": {
                                    "text": "Me desculpe, ainda não possuo conhecimento sobre notícias dessa área no momento. Gostaria de tentar outra categoria?",
                                    "quick_replies": [
                                        {
                                            "title": "Esportes",
                                            "content_type": "text",
                                            "payload": "Esportes"
                                        },
                                        {
                                            "title": "Política",
                                            "content_type": "text",
                                            "payload": "Política"
                                        },
                                        {
                                            "title": "Entretenimento",
                                            "content_type": "text",
                                            "payload": "Entretenimento"
                                        },
                                        {
                                            "title": "Famosos",
                                            "content_type": "text",
                                            "payload": "Famosos"
                                        }
                                    ]
                                }
                            }
                        }
                    ]
                }
            )
        } else {
            let result = []

            let keys = Object.keys(noticias)
            keys.sort(() => Math.random() - 0.5)
            keys = keys.slice(0, 10)

            keys.forEach(key => {
                let a = {
                    "subtitle": noticias[key].descricao.slice(0, 100),
                    "default_action": {
                        "type": "web_url",
                        "webview_height_ratio": "tall",
                        "url": `https://casper-51987.web.app/view/${intent}/${key}/`
                    },
                    "buttons": [
                        {
                            "url": `https://casper-51987.web.app/view/${intent}/${key}/`,
                            "type": "web_url",
                            "title": "Acessar notícia"
                        },
                    ],
                    "image_url": noticias[key].image,
                    "title": noticias[key].titulo
                }
                result.push(a)
            })

            res.send(
                {
                    "fulfillmentMessages": [
                        {
                            "payload": {
                                "facebook": {
                                    "attachment": {
                                        "type": "template",
                                        "payload": {
                                            "template_type": "generic",
                                            "elements": result
                                        }
                                    }
                                }
                            }
                        }
                    ]
                }
            )
        }
    })
})

// Expose Express API as a single Cloud Function:
exports.webhook = functions.https.onRequest(app);