import React from "react";
import { Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function ModalAddChapter({
  setIsShowModal,
  listContentCourseData,
  setListContentCourseData,
  dataEditChapter,
  hanleExitModal,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: dataEditChapter,
  });
  console.log(dataEditChapter);
  const onSubmit = (data) => {
    if (dataEditChapter) {
      handleEdit(data);
    } else {
      hanleAdd(data);
    }
  };

  const handleEdit = (data) => {
    const newListChapter = listContentCourseData.map((chapter) => {
      if (chapter.id === data.id) {
        return {
          ...chapter,
          chapterName: data.chapterName,
        };
      }
      return chapter;
    });

    setListContentCourseData(newListChapter);
    reset();
    hanleExitModal();
  };
  const hanleAdd = (data) => {
    const newChapter = {
      id: listContentCourseData.length + 1,
      chapterName: data.chapterName,
      lectures: [],
    };
    setListContentCourseData([...listContentCourseData, newChapter]);
    reset();
    setIsShowModal();
  };
  return (
    <Modal
      show="true"
      centered
      onHide={() => {
        hanleExitModal();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {dataEditChapter ? "Chỉnh sửa chapter" : "Thêm mới chapter"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Tên chapter</Form.Label>
            <Form.Control
              type="text"
              {...register("chapterName", { required: true })}
            />
            {errors.chapterName && <p className="form__error">Vui lòng nhập</p>}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={handleSubmit(onSubmit)}>
          {dataEditChapter ? "Cập nhật" : "Thêm mới"}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
