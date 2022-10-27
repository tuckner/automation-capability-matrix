import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import SelectBox from "components/SelectBox";
import Modal from "components/Modal";
export default function AddTask() {
   
 
  const TaskSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    subtasks: Yup.array()
      .of(
        Yup.object().shape({
          title: Yup.string().required("Required"),
        })
      )
      .min(1, "Add an item."),
  });

  return (
    <div>
      <h1>Add New Task</h1>
      <Formik
        initialValues={{
          title: "",
          description: "",
          subtasks: [],
        }}
        validationSchema={TaskSchema}
        onSubmit={(values) => {
          // same shape as initial values
          console.log(values);
        }}
      >
        {({ errors }) => (
          <Form>
            <div className="my-6">
              <label htmlFor="title" className="text-sm font-bold">Title</label>
              <Field name="title" placeholder="e.g Take a coffee break" className="p-2 w-full rounded-md" />
              {errors.title ? <div>{errors.title}</div> : null}
            </div>
            <div className="my-6">
              <label htmlFor="description" className="text-sm font-bold">Description</label>
              <Field name="description" placeholder="e.g it's always good to take a break" className="p-2 w-full rounded-md" />
              {errors.description ? <div>{errors.description}</div> : null}
            </div>

            <div className="my-6">
              <label htmlFor="subtasks" className="text-sm font-bold">Subtasks</label>
              <Field name="subtasks" className="p-2 w-full rounded-md" />
              {errors.subtasks ? <div>{errors.subtasks}</div> : null}
            </div>

            <div className="my-6">
              <SelectBox />
            </div>

            <button className="bg-primary p-2 w-full rounded-xl" type="submit">
              Create Task
            </button>
          </Form>
        )}
      </Formik>
    </div>

  );
}

// form validation
// using yup and formik
