import axios from "axios";

//this will give you the form id needed for accesing and using all the certificate routes
const accessOrCreateEventByFormId = async (formId) => {
  try {
    let res;
    res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/certificate/getEventByFormId`,
      { formId }
    );
    if (res.status !== 200) {
      const form = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/form/getAllForms`,
        { params: { id: formId } }
      );
      if (form.status === 200) {
        res = await axios.post(
          `${
            import.meta.env.VITE_API_URL
          }/api/certificate/createOrganisationEvent`,
          {
            name: form.data.info.eventTitle,
            description: form.data.info.eventdescription,
            organisationId: import.meta.env.VITE_CERT_ORG,
            formId: form.data.id,
          }
        );
      }
    }
    return res.data;
  } catch (error) {
    console.error("Error fetching event by form ID:", error);
  }
};

export { accessOrCreateEventByFormId };
