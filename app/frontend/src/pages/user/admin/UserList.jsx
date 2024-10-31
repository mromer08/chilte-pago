import { useState } from "react";
import UserItem from "./UserItem";
import Register from "../../Register";
import useAuth from "../../../hooks/useAuth";
import useUsers from "../../../hooks/useUsers"; // Importar el hook useUsers

export default function UserList() {
  const { auth } = useAuth();
  const [edit, setEdit] = useState({});
  const { users, updateUser, deleteUser } = useUsers(); // Usar el hook useUsers

  if (edit.id) {
    return <Register admin={true} edit={edit} setEdit={setEdit} updateUser={updateUser} />;
  }

  return (
    <div className="bg-gray-100 min-h-full">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Users</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {users.map(
            (user) =>
              (auth?.email !== user.email && (
                <UserItem
                  key={user.id}
                  user={user}
                  deleteUser={deleteUser}
                  updateUser={updateUser}
                  setEdit={setEdit}
                />
              )
          ))}
        </div>
      </div>
    </div>
  );
}
