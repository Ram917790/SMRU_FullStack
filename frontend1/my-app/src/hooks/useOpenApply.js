import { useContext } from "react";
import { ApplyModalContext } from "../App"; // correct: hooks -> ../App

export default function useOpenApply() {
  const { openApplyModal } = useContext(ApplyModalContext);
  return openApplyModal;
}
