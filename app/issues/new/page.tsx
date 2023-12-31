"use client";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssuesSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

type IssueForm = z.infer<typeof createIssuesSchema>;

const NewIssuePage = () => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IssueForm>({
        resolver: zodResolver(createIssuesSchema),
    });
    const router = useRouter();
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsSubmitting(true);
            await axios.post("/api/issues", data);
            router.push("/issues");
        } catch (err) {
            setIsSubmitting(false);
            setError("There was an error while creating issue");
        }
    });

    return (
        <div className="max-w-xl ">
            {error && (
                <Callout.Root color="red" as="p" className="mb-5">
                    {" "}
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            )}
            <form className="space-y-3" onSubmit={onSubmit}>
                <TextField.Root>
                    <TextField.Input
                        placeholder="Title"
                        {...register("title")}
                    />
                </TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <SimpleMDE placeholder="Description" {...field} />
                    )}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmitting}>
                    Submit New Issue{isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>
    );
};

export default NewIssuePage;
