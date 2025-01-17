import { Form, Formik } from "formik";
import { BsEmojiHeartEyes } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Button from "../components/Button";
import Input from "../components/Input";
import { ISignUpValues } from "../interface/Iuser";
import { signup } from "../redux/AuthSlice";
import { AppDispatch, RootState } from "../store";
import { passwordRegex, phoneRegex } from "../utils/Vars";
import AuthLayout from "../layouts/AuthLayout";

const Signup = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading } = useSelector((state: RootState) => state.auth);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .matches(
        passwordRegex,
        "Password must contain at least 8 characters, one uppercase letter, one number, and one special character."
      )
      .required("Password is required"),
    phone: Yup.string()
      .matches(phoneRegex, "Invalid Egyptian phone number")
      .required("Phone number is required")
  });

  const initialValues = {
    phone: "",
    email: "",
    password: ""
  };

  const handleSubmit = async (values: ISignUpValues) => {
    const response = await dispatch(signup(values));

    if (signup.fulfilled.match(response)) {
      navigate("/login");
    }
  };

  return (
    <AuthLayout>
      <section className="h-full py-8 bg-mainBg flex flex-col items-center ">
        <header>
          <h1 className="text-[1.6rem] sm:text-[2rem] md:text-[2.6rem] text-center text-secondaryBtnBg font-semibold flex items-center gap-x-2">
            Welcome to Our Hotel <BsEmojiHeartEyes />{" "}
          </h1>
          <p className="text-[1.3rem] sm:text-[1.8rem] md:text-[2.4rem] text-center text-bodyText font-semibold">
            You Have to Signup Please!
          </p>
        </header>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="w-[18rem] sm:min-w-[28rem] md:min-w-[32rem] lg:min-w-[36rem] mt-10 gap-y-4  items-center flex flex-col">
              <Input name="email" type="email" label="Email" />
              <Input name="password" type="password" label="Password" />
              <Input name="phone" type="string" label="Phone" />

              <div className="w-full flex flex-col sm:flex-row gap-y-2 items-center justify-between">
                <Button className="w-full sm:w-[30%]" disabled={loading}>
                  {loading ? "Logging in..." : "Submit"}
                </Button>
                <p className="text-headingText ">
                  If you have an account ?{" "}
                  <Link to={"/login"} className="underline text-primaryBlue ">
                    Login now
                  </Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>
        ;
      </section>
    </AuthLayout>
  );
};

export default Signup;
