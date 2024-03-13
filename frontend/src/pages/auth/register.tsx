import { REGISTER } from "@/requetes/mutations/auth.mutations";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";

function Register() {
    const router = useRouter();
  
    // const [register, { error }] = useMutation<
    //   RegisterMutation,
    //   RegisterMutationVariables
    // >(REGISTER, {
    //   onCompleted: (data) => {
    //     console.log(data);
    //     router.push("/auth/login");
    //   },
    //   onError(error) {
    //     console.log(error);
    //   },
    // });
    // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //   e.preventDefault();
    //   const formData = new FormData(e.currentTarget);
    //   const data = Object.fromEntries(formData) as InputRegister;
    //   if (data.email && data.password) {
    //     register({
    //       variables: { infos: { email: data.email, password: data.password } },
    //     });
    //   }
    // };
    return (
      <main>
        {/* <form onSubmit={handleSubmit}> */}
        <form>
        <h1>Welcome to Wild code Hub !</h1>
          <div>
            <input type="text" name="email" placeholder="Indiquez votre email" />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Indiquez votre mot de passe"
            />
          </div>
          <input type="submit" />
        </form>
      </main>
    );
  }
  
  export default Register;