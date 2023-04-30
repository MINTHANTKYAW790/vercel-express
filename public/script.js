const apiUrl = localStorage.getItem("apiUrl");
const fetchData = async () => {
    if (apiUrl) {
        const response = await fetch(`${apiUrl}/users`);
        const data = await response.json();
        console.log(data);
    } else {
        window.location.href = "/api";
    }
};

const upload = async () => {
    const inputTag = document.getElementById("uploadFile");
    const files = [...inputTag.files];
    const formData = new FormData();
    formData.append(
        "user",
        JSON.stringify({ name: "user", email: "user1@gmail.com", age: 30 })
    );
    files.forEach((file) => formData.append("files", file));
    const response = await fetch(`${apiUrl}/uploadFile`, {
        method: "POST",
        body: formData,
    });
    console.log(response);
};

fetchData();
