    import React, { useState, useEffect } from "react";
    import { useParams } from "react-router-dom";
    import { Button, Input } from "../../../../components";
    import { api } from "../../../../services";
    import { BiFontSize } from "react-icons/bi";
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
        setCheckedAttendees((prev) => [...prev, email]);
        setAttendees((prev) => prev.filter((a) => a !== email));
    };

    const handleUncheckAttendee = (email) => {
        setAttendees((prev) => [...prev, email]);
        setCheckedAttendees((prev) => prev.filter((a) => a !== email));
    };

    const filteredAttendees = attendees.filter((email) =>
        email.toLowerCase().includes(filterText.toLowerCase())
    );

    const filteredCheckedAttendees = checkedAttendees.filter((email) =>
        email.toLowerCase().includes(uncheckedFilterText.toLowerCase())
    );

    const handleTestMail = () => {
        console.log("Sending test mail with frequency:", mailFrequency);
        console.log("To:", recipientEmail);
        console.log("Subject:", subject);
        console.log("Description:", description);
    };

    return (
        <div style={{ maxWidth: 1200, margin: "auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
        <h1 style={{ textAlign: "center", marginBottom: 20 }}>Send Certificate</h1>

        <div style={{ display: "flex", gap: 20 }}>
            {/* Certificate Preview */}
            <div style={{ flex: 1, padding: 20, border: "1px solid #ccc", borderRadius: 10 }}>
            <img
                src={certificateTemplate.img}
                alt="Certificate Preview"
                style={{ width: "100%", borderRadius: 10 }}
            />
            </div>

            {/* Email Controls + Available Attendees */}
            <div style={{flex: 1, padding: 20, border: "1px solid #ccc", borderRadius: 10 }}>
            {/* Available Attendees */}
            <h3>Available Attendees</h3>
            <div style={{ display: "flex",marginBottom: 10,gap: 10, alignItems: "center"}}>
            <Input
                style={{marginTop: -15}}
                type="text"
                placeholder="Filter"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
            />
            <Button onClick={() => setCheckedAttendees(attendees) & setAttendees([])}>
            Select All
            </Button>
            </div>

            <div
                style={{
                maxHeight: "120px", 
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
                    <div
                    key={email}
                    style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 5 }}
                    >
                    <Checkbox
                        id={`check-${email}`}
                        checked={false}
                        onCheckedChange={() => handleCheckAttendee(email)}
                    />
                    <label>{email}</label>
                    </div>
                ))
                ) : (
                <p>No attendees found.</p>
                )}
            </div>

            {/* Email Inputs */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 20 }}>
                <h3 style={{ marginBottom: -20 }}>Recipient Email</h3>
                <Input
                    type="email"
                    placeholder="Email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    style={{ marginTop: 10, flex: 1 }}
                />
                <Button onClick={() => setCheckedAttendees([...attendees])}
                style={{ marginBottom: 0 }}>Select All</Button>
                </div>
                <div>
                <h3 style={{ marginBottom: -20 }}>Subject</h3>
                <Input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                style={{ marginTop: 10,marginLeft: 0, width: "100%" }}
            />
            </div>
            <div>
                <h3 style={{ marginBottom: 20 }}>Description</h3>
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
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 20 }}>
                <h3 style={{ whiteSpace: "nowrap", marginTop: 10 }}>Mail Frequency</h3>
                <Input
                    type="number"
                    placeholder="Mail Frequency"
                    value={mailFrequency}
                    onChange={(e) => setMailFrequency(e.target.value)}
                    style={{ width: 90,marginBottom : 20}} 
                />
                <div style={{marginTop: 10,display: "flex", gap: 10}}>
                <Button 
                onClick={handleTestMail} 
                style={{ padding: "5px 10px", fontSize: "14px" }}
                >
                Test Mail
                </Button>
                <Button 
                style={{ padding: "5px 10px", fontSize: "14px" }}
                >
                Send Mail
                </Button>
                </div>
                </div>     
            </div>
        </div>
        <div style={{ flex: 1, padding: 20, border: "1px solid #ccc", borderRadius: 10, marginTop: 20 }}>
            <h3>Unchecked Attendees</h3>
            <Input
            style={{marginTop: -15,width: "20%"}}
            type="text"
            placeholder="unchecked"
            value={uncheckedFilterText}
            onChange={(e) => setUncheckedFilterText(e.target.value)}
            />
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 5 }}>
            <Input
                style={{marginTop: -15}}
                type="text"
                placeholder="Filter"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
            />
            <Button onClick={() => setCheckedAttendees(attendees) & setAttendees([])}>
            Select All
            </Button>
            </div>
            {filteredCheckedAttendees.map((email) => (
            <div
            key={email}
            style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 5 }}
            >
                <Checkbox
                id={`uncheck-${email}`}
                checked={true}
                onCheckedChange={() => handleUncheckAttendee(email)}
                />
                <label>{email}</label>
            </div>
            ))}
        </div>
        </div>
    );
    };

    export default SendCertificate;
