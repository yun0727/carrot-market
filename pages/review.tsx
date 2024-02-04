import Button from "@components/button";
import Input from "@components/input";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import useMutation from "@libs/client/useMutation";
import { Review } from "@prisma/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface ReviewForm {
  score: number;
  review: string;
}

interface ReviewResponse {
  ok: boolean;
  review: Review;
}

const WriteReview: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<ReviewForm>();
  const [createReview, { loading, data }] =
    useMutation<ReviewResponse>(`/api/reviews`);
  const onValid = (data: ReviewForm) => {
    if (loading) return;
    createReview({
      ...data,
      createdById: Number(router.query.createdById),
      createdForId: Number(router.query.createdForId),
      // score: Number(router.query.score),
    });
  };
  useEffect(() => {
    if (data && data.ok) {
      router.push(`/`);
    }
  }, [data, router]);

  return (
    <Layout title="Write A Review" canGoBack>
      <form onSubmit={handleSubmit(onValid)} className="px-4 py-10">
        <Input
          required={true}
          type="number"
          name="rating"
          register={register("score", {
            required: true,
            pattern: /^[1-5]+$/,
            maxLength: 1,
            // valueAsNumber: true,
          })}
          label="Rating : 1~5"
        />
        <TextArea
          register={register("review", {
            required: true,
            minLength: 5,
          })}
          required
          placehodler="Write A Review!"
        />
        <Button text={loading ? "Loading..." : "Submit"} />
      </form>
    </Layout>
  );
};

export default WriteReview;
