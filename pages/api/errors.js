export default function Errors(req, res) {
    if (req.query.error == "Invalid Credentials") {
        res.redirect("/auth/loginerror", 301)
    }
}