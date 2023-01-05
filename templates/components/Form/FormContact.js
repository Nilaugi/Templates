import React, {
  useRef,
  useState,
  useEffect,
} from "react";
import { toast } from "react-toastify";
import IconUser from "../../../public/icons/user.svg";
import IconEmail from "../../../public/icons/email.svg";
import IconPhone from "../../../public/icons/phone.svg";
import IconSearch from "../../../public/icons/search.svg";
import FormInput from "./FormInput";
import FormTextarea from "./FormTextarea";
import FormPage from "./FormPage";
import {
  handleChange,
  addErrorClass,
} from "../../utils/form";
import { emailRegex } from "../../utils/mail";
import { telRegex } from "../../utils/tel";

const FormContact = ({ initSubject }) => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const telRef = useRef(null);
  const subjectRef = useRef(null);
  const messageRef = useRef(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [subject, setSubject] =
    useState(initSubject);
  const [message, setMessage] = useState("");

  const handleError = (ref, error) => {
    if (ref.current) addErrorClass(ref.current);
    toast.error(error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newTel = tel
        .replace("+33", "0")
        .split(" ")
        .join("");

      if (!name.length) {
        handleError(
          nameRef,
          "Veuillez renseigner le champ Nom / Prénom",
        );
        return;
      } else if (name.length > 60) {
        handleError(
          nameRef,
          "Le champ Nom / Prénom ne doit pas excéder 60 caractères",
        );
        return;
      } else if (!email.length) {
        handleError(
          emailRef,
          "Veuillez renseigner le champ Email",
        );
        return;
      } else if (email.length > 255) {
        handleError(
          emailRef,
          "Le champ Email ne doit pas excéder 255 caractères",
        );
        return;
      } else if (!emailRegex.test(email)) {
        handleError(
          emailRef,
          "Le champ Email est invalide",
        );
        return;
      } else if (!newTel.length) {
        handleError(
          telRef,
          "Veuillez renseigner le champ Téléphone",
        );
        return;
      } else if (!telRegex.test(newTel)) {
        handleError(
          telRef,
          "Le champ Téléphone est invalide",
        );
        return;
      } else if (!subject.length) {
        handleError(
          subjectRef,
          "Veuillez renseigner le champ Sujet",
        );
        return;
      } else if (subject.length > 255) {
        handleError(
          subjectRef,
          "Le champ Sujet ne doit pas excéder 255 caractères",
        );
        return;
      } else if (!message.length) {
        handleError(
          messageRef,
          "Veuillez renseigner le champ Message",
        );
        return;
      } else if (message.length > 10000) {
        handleError(
          messageRef,
          "Le champ Message ne doit pas excéder 10 000 caractères",
        );
        return;
      }

      const formData = new FormData();
      formData.append("Nom/Prénom", name);
      formData.append("Email", email);
      formData.append("Téléphone", tel);
      formData.append("Sujet", subject);
      formData.append("Message", message);

      const res = await fetch(
        "https://getform.io/f/6773efc0-2f5c-4820-9fa3-d1057cc62c05",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        },
      );

      console.log(res);

      setName("");
      setEmail("");
      setTel("");
      setSubject("");
      setMessage("");

      window.localStorage.removeItem(
        "prediction",
      );

      toast.success(
        "Message envoyé avec succès !",
      );
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    setSubject(initSubject);
  }, [initSubject]);

  return (
    <FormPage
      footerText="Pour toute demande d'informations, merci d'utiliser le formulaire en ligne ci-dessus"
      footerImgSrc="/img/red-pc.jpg"
      footerImgAlt="Image"
    >
      <>
        <h1>PRENDRE RENDEZ-VOUS</h1>
        <p className="form-page-form-text">
          Tous les champs sont obligatoires
        </p>

        <form
          method="POST"
          onSubmit={handleSubmit}
        >
          <FormInput
            icon={<IconUser />}
            id="name"
            myRef={nameRef}
            handleChange={handleChange}
            setState={setName}
            state={name}
            ariaDescribedby="Veuillez renseigner votre nom / prénom"
            title="Nom / Prénom"
            mb
            maxLength={60}
            type="text"
          />

          <FormInput
            icon={<IconEmail />}
            id="email"
            myRef={emailRef}
            handleChange={handleChange}
            setState={setEmail}
            state={email}
            ariaDescribedby="Veuillez renseigner votre email"
            title="Email"
            mb
            maxLength={255}
            type="email"
          />
          <FormInput
            icon={<IconPhone />}
            id="tel"
            myRef={telRef}
            handleChange={handleChange}
            setState={setTel}
            state={tel}
            ariaDescribedby="Veuillez renseigner votre numéro de téléphone"
            title="Téléphone"
            mb
            maxLength={60}
            type="text"
          />

          <FormInput
            icon={<IconSearch />}
            id="subject"
            myRef={subjectRef}
            handleChange={handleChange}
            setState={setSubject}
            state={subject}
            ariaDescribedby="Veuillez renseigner le sujet du rendez-vous"
            title="Sujet"
            mb
            maxLength={255}
            type="text"
          />

          <FormTextarea
            id="message"
            myRef={messageRef}
            handleChange={handleChange}
            setState={setMessage}
            state={message}
            ariaDescribedby="Veuillez renseigner votre message"
            title="Message"
            maxLength={10000}
          />

          <button
            type="submit"
            className="btn-submit"
          >
            Envoyer
          </button>
        </form>
      </>
    </FormPage>
  );
};

export default FormContact;
