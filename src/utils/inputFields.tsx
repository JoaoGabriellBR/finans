import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";

export const inputFields = [
    {
      id: "name",
      label: "Nome",
      type: "text",
      placeholder: "José Silva",
      icon: AiOutlineUser
    },
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "exemplo@gmail.com",
      icon: AiOutlineMail
    },
    {
      id: "password",
      label: "Senha",
      type: "",
      placeholder: "********",
      icon: AiOutlineLock
    },
];