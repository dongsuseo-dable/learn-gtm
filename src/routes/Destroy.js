import { redirect } from "react-router-dom";
import { deleteContact } from "../contacts";

export async function action({ params }) {
  // eslint-disable-next-line no-unreachable
  await deleteContact(params.contactId);
  return redirect("/");
}