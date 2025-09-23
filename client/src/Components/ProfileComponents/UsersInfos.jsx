import React, { useEffect } from "react";
import useAPICalling from "../../Common/useAPICalling";
import UserCard from "../UserCard";
import useCommon from "../../Common/Store/useCommon";

const UsersInfos = () => {
  const { users, fetchUsers } = useAPICalling();
  const { searchQuery } = useCommon();

  useEffect(() => {
    const loadUsers = async () => {
      await fetchUsers();
    };
    loadUsers();
  }, [fetchUsers]);

  const filteredUsers = users.filter((user) =>
    `${user?.firstName ?? ""} ${user?.lastName ?? ""} ${user?.email ?? ""} ${user?.phone ?? ""} ` // add space and safe fallback
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <section className="max-h-[calc(100vh-5em)]">
      <h1 className="mb-6 text-2xl font-bold">Users <span className="text-font2-light font-light">({users?.length} users)</span></h1>

      <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </section>
  );
};

export default UsersInfos;
