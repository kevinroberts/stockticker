package stockticker

/**
 * stockticker
 *
 * @author Kevin Roberts
 * date: 3/2/14
 */
class Error {

    private String detailedMessage
    private String message;
    private String code;

    String getMessage() {
        return message
    }

    void setMessage(String message) {
        this.message = message
    }

    String getCode() {
        return code
    }

    void setCode(String code) {
        this.code = code
    }

    String getDetailedMessage() {
        return detailedMessage
    }

    void setDetailedMessage(String detailedMessage) {
        this.detailedMessage = detailedMessage
    }
}
