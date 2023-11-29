class Helper {
    static maxBody(body, maxBodyLength) {
        return `${body.substring(0, maxBodyLength)}...`;
    }
}

export default Helper;
