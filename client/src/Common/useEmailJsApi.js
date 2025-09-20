import { create } from "zustand";

const useEmailJsApi = create((set, get) => ({
  sendEmail: (e, form) => {
    e.preventDefault();

    emailjs
      .sendForm("service_mgjv5xd", "template_xi55lji", form.current, {
        publicKey: "258OS8641r5kw2FUw",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  },
}));

export default useEmailJsApi;
