class Helper {
    static maxBody(body, maxBodyLength) {
        console.log(body)
        return `${body.substring(0, maxBodyLength)}...`;
    }
}

export default Helper;
