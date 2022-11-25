import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import chapterApi from "../../../../api/chapterApi";
import SimpleSelect from "../../../../components/Select/SimpleSelect";
export default function ModalChapter({
  editRow,
  showModal,
  setShowModal,
  listchapters,
  onHide,
  setEditRow,
}) {
  const isEdit = editRow;
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: isEdit ? editRow : null,
  });
  const { id } = useParams();
  const onSubmit = (data) => {
    data.courseId = id;
    if (isEdit) {
      handleEdit(data);
    } else {
      handleAdd(data);
    }
    reset();
    onHide();
  };
  const handleEdit = async (data) => {
    const res = await chapterApi.update(id, data);
    if (res.errorCode === "") {
      Swal.fire({
        icon: "success",
        title: "Sửa thành công",
        showConfirmButton: false,
      });
      setEditRow(null);
    } else {
      Swal.fire({
        icon: "error",
        title: "Sửa thất bại",
        showConfirmButton: false,
      });
    }
  };
  const handleAdd = async (data) => {
    const res = await chapterApi.addIntoCourse(id, data);
    if (res.errorCode === "") {
      Swal.fire({
        icon: "success",
        title: "Thêm thành công",
        showConfirmButton: false,
      });
      setEditRow(res.data);
    } else {
      Swal.fire({
        icon: "error",
        title: "Thêm thất bại",
        showConfirmButton: false,
      });
    }
  };

  const listOptions = listchapters
    ? listchapters?.concat({
        id: -1,
        chapterName: "Cuối khóa học",
      })
    : [
        {
          id: -1,
          chapterName: "Cuối khóa học",
        },
      ];
  console.log("listchapter", listOptions);

  return (
    <Modal
      show="true"
      size="lg"
      centered
      onHide={() => {
        onHide();
        reset();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Thêm mới Chapter
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Form */}
        <Form className="container" onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={6} sm={12}>
              <Form.Group className="mb-3">
                <Form.Label>Tên chapter(*)</Form.Label>

                <Form.Control
                  {...register("chapterName", {
                    required: true,
                  })}
                  type="text"
                />
                {errors.chapterName && (
                  <Form.Label className="error">Vui lòng nhập</Form.Label>
                )}
              </Form.Group>
            </Col>
            <Col md={6} sm={12}>
              <Form.Group className="mb-3">
                <Form.Label>Thứ tự trong khóa học(*)</Form.Label>

                <SimpleSelect
                  control={control}
                  required={true}
                  field={"nextChapterId"}
                  placeholder="Chọn tiêu đề"
                  options={
                    listOptions
                      ?.map((item) => {
                        return {
                          value: item.id,
                          label:
                            item.id !== -1
                              ? "Trước " + item.chapterName
                              : item.chapterName,
                        };
                      })
                      .filter((item) => item.value !== isEdit?.id) || []
                  }
                />
                {errors.nextChapterId && (
                  <Form.Label className="error">Vui lòng chọn</Form.Label>
                )}
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit(onSubmit)}>Lưu</Button>
        <Button onClick={onHide}>Hủy</Button>
      </Modal.Footer>
    </Modal>
  );
}
