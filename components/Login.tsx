"use client";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface LoginProps {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

export default function Login({ setIsLoggedIn }: LoginProps) {
  const router = useRouter();
  const [correct, setCorrect] = useState<boolean | undefined>(undefined);

  function handleLogin() {
    setCorrect(true);
    return;
  }

  useEffect(() => {
    if (correct) {
      router.push("/dashboard");
      setIsLoggedIn(false);
    }
  }, [correct, router]);

  return (
    <div className="absolute grid gap-[10px] w-[400px] h-[300px] border border-(--border-color) rounded-2xl translate-x-[calc(50vw-200px)] translate-y-[50vh] z-10 bg-(--background)/80 p-5 text-(--primary-blue)">
      Login
      <div
        className={`grid gap-[5px] h-fit border ${
          correct === undefined || correct === true
            ? "border-(--border-color)"
            : "border-red-500"
        } rounded-2xl p-2`}
      >
        username:{" "}
        <input
          className="focus:outline-none"
          type="text"
          placeholder="enter username"
        />
      </div>
      <div
        className={`grid gap-[5px] h-fit border ${
          correct === undefined || correct === true
            ? "border-(--border-color)"
            : "border-red-500"
        } rounded-2xl p-2`}
      >
        password:{" "}
        <input
          className="focus:outline-none"
          type="text"
          placeholder="enter password"
        />
      </div>
      <button
        onClick={handleLogin}
        className="grid gap-[5px] h-fit border border-(--border-color) rounded-2xl p-2 text-(--primary-blue) bg-(--secondary-blue) hover:text-(--secondary-blue) hover:bg-(--primary-blue) duration-300 cursor-pointer"
      >
        Enter Password
      </button>
      {correct === undefined || correct === true ? (
        ""
      ) : (
        <div className="text-red-500 text-center">
          *Wrong username or password*
        </div>
      )}
    </div>
  );
}
