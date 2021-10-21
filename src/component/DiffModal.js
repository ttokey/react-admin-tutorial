import * as React from "react";
import {
    CButton,
    CCol,
    CForm,
    CFormLabel,
    CFormText,
    CModal,
    CModalBody,
    CModalFooter,
    CModalTitle,
    CRow
} from "@coreui/react";

export const DiffModal = (props) => {
    return (
        <CModal size="xl" visible={props.visible} onClose={() => props.setVisible(false)}>
            <CModalTitle>edit {props.env}</CModalTitle>
            <CModalBody>
                <CForm>
                    <CRow className="mb-3">
                        <CCol md={2}>
                            <CFormLabel> id</CFormLabel>
                        </CCol>
                        <CCol md={10}>
                            <CFormText>{props.response.id}</CFormText>
                        </CCol>
                    </CRow>

                    <CRow className="mb-3">
                        <CCol md={2}>
                            <CFormLabel> fields</CFormLabel>
                        </CCol>
                        <CCol md={10}>
                            {/*<showField/>*/}
                        </CCol>
                    </CRow>

                    <CRow className="mb-3">
                        <CCol md={2}>
                            <CFormLabel> status</CFormLabel>
                        </CCol>
                        <CCol md={10}>
                            <CFormText>{props.response.status}</CFormText>
                        </CCol>
                    </CRow>

                    <CRow className="mb-3">
                        <CCol md={4}>
                            <CFormLabel> sourceData</CFormLabel>
                        </CCol>
                        <CCol md={4}>
                            <CFormLabel> targetData</CFormLabel>
                        </CCol>
                        <CCol md={4}>
                            <CFormLabel> diffData</CFormLabel>
                        </CCol>
                    </CRow>

                    <CRow className="mb-3">
                        <CCol md={4}>
                            <CFormText>
                                {
                                    props.response.sourceData.split('\n').map(line => {
                                        return (<span>{line}<br/></span>)
                                    })
                                }
                            </CFormText>
                        </CCol>
                        <CCol md={4}>
                            <CFormText>
                                {
                                    props.response.targetData.split('\n').map(line => {
                                        return (<span>{line}<br/></span>)
                                    })
                                }
                            </CFormText>
                        </CCol>
                        <CCol md={4}>
                            <CFormText dangerouslySetInnerHTML={{__html: props.response.diffData}}></CFormText>
                        </CCol>
                    </CRow>
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={() => props.setVisible(false)}>
                    확인
                </CButton>
            </CModalFooter>
        </CModal>
    )

}


