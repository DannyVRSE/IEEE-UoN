import db from "../Models/index.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import sendingMail from "../nodemailer/mailing.js";
import process from "node:process";

const Member = db.Member;
const Token = db.Token;
const saltrounds = 10;

//sign up
const signUp = async (req, res) => {
    try {
        const { name, email, reg_no, ieee_no, phone, password } = req.body;
        const data = {
            name,
            email,
            reg_no,
            ieee_no,
            phone,
            password: await bcrypt.hash(password, saltrounds),
        };
        const member = await Member.create(data);
        if (member) {
            let setToken = await Token.create({
                member_id: member.member_id,
                token: crypto.randomBytes(16).toString('hex'),
            });

            if (setToken) {
                //send mail to user
                sendingMail({
                    from: process.env.EMAIL,
                    to: `${email}`,
                    subject: "IEEE UoN Verification",
                    text: `Hello ${name} Please verify your email by
                clicking this link :
                http://localhost:${process.env.PORT}/api/users/verify-email/${member.member_id}/${setToken.token}`
                });
            } else {
                res.status(400).send("Token not created");
            }
            console.log("member", JSON.stringify(member, null, 2))

            //send users details
            return res.status(201).send(member);
        } else {
            return res.status(409).send("Details are not correct");
        }
    } catch (error) {
        console.log(error);
    }
};

//verify email
const verifyEmail = async (req, res) => {
    try {
        const token = req.params.token;

        //find user by token using the where clause
        const memberToken = await Token.findOne({
            token,
            where: {
                member_id: req.params.id,
            },
        });
        console.log(memberToken);

        if (!memberToken) {
            return res.status(400).send({
                msg: "Your verification link may have expired. Please click on resend for verify your Email.",
            });

            //if token exist, find the user with that token
        } else {
            const member = await Member.findOne({ where: { id: req.params.id } });
            if (!member) {
                console.log(member);
                return res.status(401).send({
                    msg: "We were unable to find a user for this verification. Please SignUp!",
                });

                //if user is already verified, tell the user to login
            } else if (member.isVerified) {
                return res
                    .status(200)
                    .send("User has been already verified. Please Login");

                //if user is not verified, change the verified to true by updating the field
            } else {
                const updated = await member.update(
                    { isVerified: true },
                    {
                        where: {
                            member_id: memberToken.member_id,
                        },
                    }
                );
                console.log(updated);

                //if not updated send error message
                if (!updated) {
                    return res.status(500).send({ message: "Error verifying email" });
                    //else send status of 200
                } else {
                    return res
                        .status(200)
                        .send("Your account has been successfully verified");
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
};

//login authentication

export default { signUp, verifyEmail };