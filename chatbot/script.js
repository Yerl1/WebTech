$(document).ready(function () {
    $("#send-btn").on("click", function () {
        let userMessage = $("#user-input").val().trim();
        if (userMessage === "") return;

        appendMessage("user", userMessage);
        $("#user-input").val("");

        $.ajax({
            url: "http://127.0.0.1:5000/chat",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ message: userMessage }),
            success: function (response) {
                appendMessage("bot", response.message);
            },
            error: function () {
                appendMessage("bot", "Error: Unable to connect to AI service.");
            }
        });
    });

    function appendMessage(sender, message) {
        let className = sender === "user" ? "user-message" : "bot-message";
        let wrapperClass = sender === "user" ? "user-wrapper" : "bot-wrapper";
    
        let messageHTML = `
            <div class="message-wrapper ${wrapperClass}">
                <div class="${className}">${message}</div>
            </div>
        `;
    
        $("#chat-box").append(messageHTML);
        $("#chat-box").scrollTop($("#chat-box")[0].scrollHeight);
    }
    
});
