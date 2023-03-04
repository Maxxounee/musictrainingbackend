import {Router} from "express";
const router = new Router()
import SingleNotesController from "../database/alenmethod/SingleNotesController.js";


router.post('/alenmethod', SingleNotesController.getFiles)
router.get('/alenmethod', (req, res) => {
    res.send('123')
})
export default router