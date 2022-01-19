import React, { useRef } from "react";
import { Button, Input, Form, Alert, message } from "antd";
import styles from "../css/Login.module.css";
import { LoginReqType } from "../types";
import { AuthLoginState } from "../redux/modules/auth";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/authService";

const Login = () => {
  const emailRef = useRef<Input>(null);
  const passwordRef = useRef<Input>(null);

  // antd form control
  const [form] = Form.useForm();

  const loginState: AuthLoginState = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  // submit 할때 Form
  const onSubmitForm = async () => {
    const email = emailRef.current!.state.value;
    const password = passwordRef.current!.state.value;

    console.log("email, password", email, password);
    await checkLogin(email, password)
      .then((result) => {
        console.log("result ", result);
        navigate("/");
      })
      .catch((err) => {
        console.log("login ", loginState);
        // alert(err.data.statusMessage);
        if (err.data.statusMessage === "회원정보가 없습니다") {
          message.error(err.data.statusMessage);
          // navigate("/signup");
        }
      });
    // navigate("/");
  };

  const checkLogin = async (email: string, password: string) => {
    const response = await AuthService.login({ email, password });
    return response;
  };

  return (
    <div className={styles.login_page}>
      <div className={styles.login_box}>
        <div className={styles.illustration_wrapper}>
          <img
            src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700"
            alt="Login"
          />
        </div>
        <Form className={styles.login_form} onFinish={onSubmitForm} form={form}>
          <p
            style={{
              color: "#333333",
              fontSize: "30px",
              fontWeight: "bold",
              lineHeight: 1,
              marginBottom: 0,
              //   marginLeft: 10,
            }}
          >
            Login Book
          </p>
          {/* <p style={{ marginBottom: 30 }}>Login to the Dashboard</p> */}
          <div className={styles.email_title}>
            Email <span className={styles.required}>*</span>
          </div>
          <Form.Item
            name="email"
            rules={[
              { type: "email", message: "The input is not valid E-mail!" },
              { required: true, message: "Please input your E-mail!" },
            ]}
          >
            <div className={styles.input_area}>
              <Input
                placeholder="Email"
                autoComplete="email"
                name="email"
                className={styles.input}
                ref={emailRef}
              />
            </div>
          </Form.Item>
          <div className={styles.password_title}>
            Password <span className={styles.required}>*</span>
          </div>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <div className={styles.input_area}>
              <Input.Password
                type="password"
                autoComplete="current-password"
                name="password"
                className={styles.input}
                ref={passwordRef}
              />
            </div>
          </Form.Item>
          <div className={styles.button_area}>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.login_form_button}
              size="large"
            >
              Login
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
