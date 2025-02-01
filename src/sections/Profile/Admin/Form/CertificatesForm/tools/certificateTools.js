import { api } from "../../../../../../services";

// This function retrieves or creates an event based on the provided formId
const accessOrCreateEventByFormId = async (formId) => {
  try {
    let res = await api.post("/api/certificate/getEventByFormId", { formId });

    if (res.status !== 200) {
      const form = await api.get("/api/form/getAllForms", {
        params: { id: formId },
      });
      // console.log(form);
      if (form.status === 200) {
        res = await api.post("/api/certificate/createOrganisationEvent", {
          name: form.data.events.info.eventTitle,
          description: form.data.events.info.eventdescription,
          organisationId: import.meta.env.VITE_CERT_ORG,
          formId: form.data.events.id,
        });
      }
    }
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching event by form ID:", error);
  }
};

const getCertificatePreview = async (formId) => {
  try {
    //1 get event
    const event = await accessOrCreateEventByFormId(formId);
    console.log(event);
    //get certifcate template src from event and fields
    const certificate = event.certificates[0].template;
    const fields = event.certificates[0].fields;

    //create a dummy certificate

    const cert = await api.post("/api/certificate/dummyCertificate", {
      imageLink: certificate,
      fields,
    });

    console.log(cert.data.imageSrc);
    return cert.data.imageSrc;
  } catch (error) {
    console.error("Error fetching certificate preview:", error);
  }
};

const sendBatchMail = async () => {
  try {
    const response = await api.post("/api/certificate/sendBatchMails", {
      batchSize: 10,
      formId: "your-form-id",
      subject: "Your email subject",
      htmlContent: "Your email HTML content"
    });

    console.log(response.data);
  } catch (error) {
    console.error("Error sending batch mail:", error);
  }
}; 

export { accessOrCreateEventByFormId, getCertificatePreview, sendBatchMail };
