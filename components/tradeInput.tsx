"use client";

import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Session } from "next-auth";
import React, { useRef, useState } from "react";

function TradeInput({ session }: { session: Session }) {
    const [mistakes, setMistakes] = useState<number[]>([]);
    const [title, setTitle] = useState<string>("");
    const [id, setId] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<number>();
    const input1Ref = useRef<HTMLInputElement>(null);
    const input2Ref = useRef<HTMLInputElement>(null);
    const input3Ref = useRef<HTMLInputElement>(null);
    const input4Ref = useRef<HTMLInputElement>(null);

    const notify = () =>
        toast.success("Trade created successfully !", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });

    const notify2 = () =>
        toast.warn("Please fill all fields !", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });

    const handleCheckboxChange = (mistakeNumber: number) => {
        setMistakes((prevMistakes: number[]) => {
            if (prevMistakes.includes(mistakeNumber)) {
                // Remove mistakeNumber if it's already in the array
                return prevMistakes.filter(
                    (num: number) => num !== mistakeNumber
                );
            } else {
                // Add mistakeNumber to the array

                return [...prevMistakes, mistakeNumber];
            }
        });
    };

    const submitHandle = async () => {
        // Check if any of the fields are empty
        if (!id || !title || !description || !price) {
            notify2();
            return;
        }

        // API to create trade
        const result = await axios.post("/api/trades/1", {
            id,
            userId: session.user?.email,
            title,
            description,
            price,
            createdAt: new Date(),
            updatedAt: new Date(),
            mistakes,
        });

        // clean up the states
        setId("");
        setTitle("");
        setDescription("");
        setPrice(0);
        setMistakes([]);

        // Removes all checkboxes
        const checkboxes = document.querySelectorAll(
            ".checkbox-info"
        ) as NodeListOf<HTMLInputElement>;
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });
        // clean all the inputs
        if (input1Ref.current) {
            input1Ref.current.value = "";
        }
        if (input2Ref.current) {
            input2Ref.current.value = "";
        }
        if (input3Ref.current) {
            input3Ref.current.value = "";
        }
        if (input4Ref.current) {
            input4Ref.current.value = "";
        }

        // Show toast
        notify();
    };

    return (
        <div className="flex items-center justify-center x flex-col gap-10 mt-10">
            <input
                type="text"
                placeholder="Id"
                ref={input1Ref}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => {
                    setId(e.target.value);
                }}
            />
            <input
                type="text"
                placeholder="Title"
                ref={input2Ref}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
            />

            <input
                type="text"
                placeholder="Description"
                ref={input3Ref}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => {
                    setDescription(e.target.value);
                }}
            />
            <input
                type="number"
                placeholder="Price"
                ref={input4Ref}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => {
                    setPrice(Number(e.target.value));
                }}
            />
            <div className="flex gap-5 w-[400px] justify-center items-center flex-wrap">
                <label className="cursor-pointer label">
                    <span className="mr-5">Mistake 1</span>
                    <input
                        type="checkbox"
                        className="checkbox checkbox-info"
                        onChange={() => handleCheckboxChange(1)}
                    />
                </label>

                <label className="cursor-pointer label">
                    <span className="mr-5">Mistake 2</span>
                    <input
                        type="checkbox"
                        className="checkbox checkbox-info"
                        onChange={() => handleCheckboxChange(2)}
                    />
                </label>

                <label className="cursor-pointer label">
                    <span className="mr-5">Mistake 3</span>
                    <input
                        type="checkbox"
                        className="checkbox checkbox-info"
                        onChange={() => handleCheckboxChange(3)}
                    />
                </label>

                <label className="cursor-pointer label">
                    <span className="mr-5">Mistake 4</span>
                    <input
                        type="checkbox"
                        className="checkbox checkbox-info"
                        onChange={() => handleCheckboxChange(4)}
                    />
                </label>

                <label className="cursor-pointer label">
                    <span className="mr-5">Mistake 5</span>
                    <input
                        type="checkbox"
                        className="checkbox checkbox-info"
                        onChange={() => handleCheckboxChange(5)}
                    />
                </label>

                <label className="cursor-pointer label">
                    <span className="mr-5">Mistake 6</span>
                    <input
                        type="checkbox"
                        className="checkbox checkbox-info"
                        onChange={() => handleCheckboxChange(6)}
                    />
                </label>

                <div>
                    <strong>Selected Mistakes:</strong>{" "}
                    {JSON.stringify(mistakes)}
                </div>
            </div>
            <div>
                <button onClick={submitHandle} className="btn btn-primary">
                    Primary
                </button>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
        </div>
    );
}

export default TradeInput;
