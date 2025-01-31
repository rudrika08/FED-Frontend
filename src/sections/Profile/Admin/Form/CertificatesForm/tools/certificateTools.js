import { api } from "../../../../../../services";

// This function retrieves or creates an event based on the provided formId
const accessOrCreateEventByFormId = async (formId) => {
  try {
    let res = await api.post("/api/certificate/getEventByFormId", { formId });


    if (res.status !== 200) {

      const form = await api.get("/api/form/getAllForms", { params: { id: formId } });
      console.log(form);
      if (form.status === 200) {
        res = await api.post("/api/certificate/createOrganisationEvent", {
          name: form.data.events.info.eventTitle,
          description: form.data.events.info.eventdescription,
          organisationId: import.meta.env.VITE_CERT_ORG,
          formId: form.data.id,
        });
      }
    }

    return res.data;
  } catch (error) {
    console.error("Error fetching event by form ID:", error);
  }
};

export { accessOrCreateEventByFormId };
