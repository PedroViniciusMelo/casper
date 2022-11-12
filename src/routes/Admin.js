import React from "react";
import { Routes, Route} from "react-router-dom";
import EditNews from "../views/admin/EditNews";

export default function Admin() {
    return (
        <Routes>
            <Route path={"/"} element={<Admin/>}>
                <Route path={"/edit"} element={<EditNews/>}/>
            </Route>
        </Routes>
    )
}