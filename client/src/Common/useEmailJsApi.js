import { create } from "zustand";

const useEmailJsApi = create((set, get) => ({
  publicKey: "258OS8641r5kw2FUw",
  sendEmail: (form, emailjs, handleAlert) => {
    const { publicKey } = get();
    const serviceId = "service_w13earo";
    const templateId = "template_w4smkv2";

    const templateParam = {
      name: form.name,
      email: form.email,
      message: form.message,
      time: form.time,
    };

    emailjs.send(serviceId, templateId, templateParam, publicKey).then(
      () => {
        handleAlert("Message sent successfully!", 200);
        console.log(templateParam);
      },
      (error) => {
        handleAlert(error.text, 500);
      }
    );
  },
}));

export default useEmailJsApi;
