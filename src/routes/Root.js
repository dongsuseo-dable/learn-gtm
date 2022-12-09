import { Outlet, useLoaderData, Form, redirect, NavLink, useNavigation, useSubmit, Link } from "react-router-dom";
import { getContacts, createContact } from "../contacts";
import { useEffect } from "react";

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts, q };
}

export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export default function Root() {
  const { contacts, q } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();
  const searching =
  navigation.location &&
  new URLSearchParams(navigation.location.search).has(
    "q"
  );

  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);
  console.log(contacts);
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <button>
            <Link to="/about">About</Link>
          </button>
          <button>
            <Link to="/profile">Profile</Link>
          </button>
        </div>
        <div>
          <button class="btn" id="btn1">Button 1</button>
          <button class="btn" id="btn2">Button 2</button>
          <button class="btn" id="btn3">Button 3</button>
        </div>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                const isFirstSearch = q == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
              className={searching ? "loading" : ""}
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={!searching}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
        {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }
                  >
                    {contact.first + contact.last || contact.id}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail"  className={navigation.state === "loading" ? "loading" : ""}>
        <Outlet />
      </div>
      <div>
        {new Array(200).fill(0).map((_, i) => {
          if (i % 50 === 0 && i > 0) return <div key={i}> 스크롤을 위한 텍스트</div>;
          return <br key={i} />
        })}
      </div>
    </>
  );
}