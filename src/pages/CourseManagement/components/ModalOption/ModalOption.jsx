import React from "react";
import { Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function ModalOption({
  listDataQuiz,
  setListDataQuiz,
  dataEditOption,
  hanleExitModal,
  questionId,
}) {
  console.log("questionId", questionId);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: dataEditOption,
  });
  const onSubmit = (data) => {
    if (dataEditOption) {
      handleEdit(data);
    } else {
      hanleAdd(data);
    }
  };

  const handleEdit = (data) => {
    const newListQuestion = listDataQuiz.map((question) => {
      if (question.temp_id === questionId) {
        const newOptions = question.options.map((option) => {
          if (option.temp_id === data.temp_id) {
            return {
              ...option,
              content: data.content,
              isCorrect: data.isCorrect,
              whyCorrect: data.whyCorrect,
            };
          }
          return option;
        });
        return {
          ...question,
          options: newOptions,
        };
      }
      return question;
    });
    setListDataQuiz(newListQuestion);
    reset();
    hanleExitModal();
  };

  const hanleAdd = (data) => {
    const newListQuestion = listDataQuiz.map((question) => {
      if (question.temp_id === questionId) {
        return {
          ...question,

          options: [
            ...question.options,
            {
              ...data,
              temp_id: new Date().getTime(),
            },
          ],
        };
      }
      return question;
    });
    setListDataQuiz(newListQuestion);
    reset();
    // hanleExitModal();
  };
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
          {dataEditOption ? "Chỉnh sửa lựa chọn" : "Thêm mới lựa chọn"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Nội dung lựa chọn</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              {...register("content", { required: true })}
            />
            {errors.content && <p className="form__error">Vui lòng nhập</p>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Là lựa chọn đúng</Form.Label>
            <Form.Check
              type="checkbox"
              {...register("isCorrect")}
              defaultChecked={dataEditOption?.isCorrect}
            />
            {errors.isCorrect && <p className="form__error">Vui lòng nhập</p>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Lý do:</Form.Label>
            <Form.Control as="textarea" rows={3} {...register("whyCorrect")} />
            {errors.whyCorrect && <p className="form__error">Vui lòng nhập</p>}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn-secondary btn__footer__modal"
          onClick={handleSubmit(onSubmit)}
        >
          {dataEditOption ? "Cập nhật" : "Thêm mới"}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
