import React from "react";
import { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function ModalQuestion({
  listDataQuiz,
  setListDataQuiz,
  dataEditQuestion,
  hanleExitModal,
}) {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: dataEditQuestion,
  });
  console.log("dataEditQuestion", dataEditQuestion);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(dataEditQuestion ? true : false);

  const onSubmit = (data) => {
    console.log(data);
    if (isEdit) {
      handleEditQuestion(data);
    } else {
      handleAddQuestion(data);
    }
  };

  const handleAddQuestion = (data) => {
    const newQuestion = {
      temp_id: listDataQuiz.length + 1,
      content: data.content,
      questionType: data.questionType,
      options: [],
    };
    setListDataQuiz([...listDataQuiz, newQuestion]);
    reset();
    hanleExitModal();
  };

  const handleEditQuestion = (data) => {
    const newListQuestion = listDataQuiz.map((question) => {
      if (question.temp_id === data.temp_id) {
        return {
          ...question,
          content: data.content,
          questionType: data.questionType,
        };
      }
      return question;
    });
    setListDataQuiz(newListQuestion);
    reset();
    hanleExitModal();
  };

  const listQuestionType = [
    {
      value: "CHOICE_ONE",
      name: "1 câu trả lời",
    },
    {
      value: "MULTI_CHOICE",
      name: "Nhiều câu trả lời",
    },
  ];
  return (
    <Modal
      show="true"
      centered
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      onHide={() => {
        hanleExitModal();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {dataEditQuestion ? "Chỉnh sửa câu hỏi" : "Thêm mới câu hỏi"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            maxHeight: "70vh",
            overflowY: "auto",
          }}
        >
          <Form.Group className="mb-3">
            <Form.Label>Nội dung câu hỏi</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              {...register("content", { required: true })}
            />
            {errors.title && <p className="form__error">Vui lòng nhập</p>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Loại câu hỏi</Form.Label>
            <Form.Select
              onChange={(e) => {
                console.log(e.target.value);
              }}
              {...register("questionType", { required: true })}
            >
              {listQuestionType.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.name}
                </option>
              ))}
            </Form.Select>
            {errors.questionType && (
              <p className="form__error">Vui lòng nhập</p>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn-secondary btn__footer__modal"
          onClick={handleSubmit(onSubmit)}
          disabled={loading}
        >
          {dataEditQuestion ? "Cập nhật" : "Thêm mới"}
          {loading && (
            <span
              className="spinner-border spinner-border-sm ms-2"
              role="status"
              aria-hidden="true"
            ></span>
          )}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
