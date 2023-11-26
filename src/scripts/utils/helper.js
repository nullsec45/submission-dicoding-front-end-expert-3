class Helper {
    static maxBody(body, max_body_length) {
        return body.substring(0, max_body_length) + "...";
    }
}

export default Helper;