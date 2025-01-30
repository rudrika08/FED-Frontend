import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Input } from "../../../../components";
import { api } from "../../../../services";

const Checkbox = ({ id, checked, onCheckedChange }) => {
    return (
        <input
            type="checkbox"
            id={id}
            checked={checked}
            onChange={(e) => onCheckedChange(e.target.checked)}
            style={{ width: 18, height: 18, accentColor: "#007bff" }}
        />
    );
};

const SendCertificate = () => {
    const { eventId } = useParams();
    const [loading, setLoading] = useState(false);
    const [attendees, setAttendees] = useState([]); // Unchecked attendees
    const [checkedAttendees, setCheckedAttendees] = useState([]); // Checked attendees
    const [subject, setSubject] = useState("Certificate of Appreciation");
    const [description, setDescription] = useState("");
    const [recipientEmail, setRecipientEmail] = useState("");
    const [mailFrequency, setMailFrequency] = useState(20);
    const [filterText, setFilterText] = useState("");
    const [uncheckedFilterText, setUncheckedFilterText] = useState("");

    const certificateTemplate = {
        img: "https://via.placeholder.com/600x300/ff6347/ffffff?text=Certificate+Preview",
        title: "Certificate of Appreciation",
    };

    useEffect(() => {
        const fetchAttendees = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/api/form/getFormAnalytics/${eventId}`, {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
                    },
                });

                if (response.status === 200) {
                    const fetchedAttendees = response.data.form?.formAnalytics[0]?.regUserEmails || [];
                    setAttendees(fetchedAttendees);
                } else {
                    console.error("Error fetching attendees:", response.data);
                }
            } catch (error) {
                console.error("Error fetching attendees:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAttendees();
    }, [eventId]);

    const handleCheckAttendee = (email) => {
        setCheckedAttendees((prev) => [...prev, email]);  // Move to checked
    };

    const handleUncheckAttendee = (email) => {
        setCheckedAttendees((prev) => prev.filter((a) => a !== email));  // Move back to unchecked
    }
    const handleSelectAllUnchecked = () => {
        setCheckedAttendees((prev) => [...prev, ...attendees]);
    };

    const handleDeselectAllUnchecked = () => {
        setCheckedAttendees([]);
    };

    useEffect(() => {
        setRecipientEmail(checkedAttendees.join(", "));
    }, [checkedAttendees]);

    const filteredAttendees = attendees.filter((email) =>
        email.toLowerCase().includes(uncheckedFilterText.toLowerCase())
    );

    const filteredCheckedAttendees = checkedAttendees.filter((email) =>
        email.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <div style={{ maxWidth: 1200, margin: "auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
            <h1 style={{ textAlign: "center", marginBottom: 20 }}>Send Certificate</h1>

            <div style={{ display: "flex", gap: 20 }}>
                {/* Certificate Preview */}
                <div style={{ flex: 1, padding: 20, border: "1px solid #ccc", borderRadius: 10,height:300 }}>
                    <img
                        src={certificateTemplate.img}
                        alt="Certificate Preview"
                        style={{ width: "50%", height: "10px", borderRadius: 10 }}
                    />
                </div>

                {/* Email Controls + Attendees */}
                <div style={{ flex: 1, padding: 20, border: "1px solid #ccc", borderRadius: 10 }}>
                    <h3>Unchecked Attendees</h3>
                    <Input
                        style={{ marginTop: -15, width: "100%" }}
                        type="text"
                        placeholder="Filter Unchecked"
                        value={uncheckedFilterText}
                        onChange={(e) => setUncheckedFilterText(e.target.value)}
                    />
                    <div style={{ display: "flex", gap: 10, margin: "10px 0" }}>
                        <Button onClick={handleSelectAllUnchecked}>Select All</Button>
                        <Button onClick={handleDeselectAllUnchecked}>Deselect All</Button>
                    </div>
                    <div
                        style={{
                            maxHeight: "150px",
                            overflowY: "auto",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            padding: "10px",
                            marginTop: "10px",
                        }}
                    >
                        {loading ? (
                            <p>Loading attendees...</p>
                        ) : filteredAttendees.length > 0 ? (
                            filteredAttendees.map((email) => (
                                <div key={email} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                    <Checkbox
                                        checked={checkedAttendees.includes(email)} 
                                        onCheckedChange={() =>
                                            checkedAttendees.includes(email) ? handleUncheckAttendee(email) : handleCheckAttendee(email)
                                        }
                                    />
                                    <label>{email}</label>
                                </div>
                            ))
                        ) : (
                            <p>No unchecked attendees.</p>
                        )}
                    </div>

                    <h3>Checked Attendees</h3>
                    <Input
                        style={{ marginTop: -15, width: "100%" }}
                        type="text"
                        placeholder="Filter Checked"
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                    />
                    <div
                        style={{
                            maxHeight: "150px",
                            overflowY: "auto",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            padding: "10px",
                            marginTop: "10px",
                        }}
                    >
                        {filteredCheckedAttendees.length > 0 ? (
                            filteredCheckedAttendees.map((email) => (
                                <div key={email} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                    <Checkbox checked={true} onCheckedChange={() => handleUncheckAttendee(email)} />
                                    <label>{email}</label>
                                </div>
                            ))
                        ) : (
                            <p>No checked attendees.</p>
                        )}
                    </div>

                    <h3>Recipient Email</h3>
                    <Input
                        type="email"
                        placeholder="Emails will be added here"
                        value={recipientEmail}
                        readOnly
                        style={{ marginTop: 10, flex: 1 }}
                    />

                    <h3>Subject</h3>
                    <Input
                        type="text"
                        placeholder="Subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        style={{ marginTop: -10, width: "100%" }}
                    />

                    <h3>Description</h3>
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{
                            width: "100%",
                            height: 80,
                            marginTop: 10,
                            padding: 10,
                            borderRadius: 5,
                            border: "1px solid #ccc",
                            background: "Transparent",
                        }}
                    />
                    <h3>Mail Frequency</h3>
                    <Input
                        type="number"
                        placeholder="Set mail frequency"
                        value={mailFrequency}
                        onChange={(e) => setMailFrequency(e.target.value)}
                        style={{ marginTop:-10, width: "100%" }}
                    />

                    <Button onClick={() => console.log("Sending mail...")}>Send Mail</Button>
                </div>
            </div>
        </div>
    );
};

export default SendCertificate;
