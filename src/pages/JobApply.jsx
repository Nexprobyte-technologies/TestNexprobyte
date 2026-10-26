import React, { useEffect, useState, useRef } from "react";
import { Link, useParams, useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { PageHero, Breadcrumb } from "../components/PageHero.jsx";
import { JOBS } from "../data/content.js";

const EASE = [0.22, 1, 0.36, 1];

const EXPERIENCE_LEVELS = [
  "0 – 1 Year (Entry Level / Fresher)",
  "1 – 3 Years (Junior – Mid)",
  "3 – 5 Years (Mid – Senior)",
  "5+ Years (Senior / Lead)",
];

export default function JobApply() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [jobsList, setJobsList] = useState(JOBS);
  const [loadingJobs, setLoadingJobs] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    jobId: "",
    jobTitle: "",
    name: "",
    email: "",
    phone: "",
    experience: "1 – 3 Years (Junior – Mid)",
    portfolioUrl: "",
    linkedinUrl: "",
    coverLetter: "",
  });

  // PDF File State
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeData, setResumeData] = useState("");
  const [resumeFileName, setResumeFileName] = useState("");
  const [resumeSize, setResumeSize] = useState("");

  // Validation Errors
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const fileInputRef = useRef(null);

  // Fetch live jobs from API
  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setJobsList(data);
        }
      })
      .catch((e) => console.error(e))
      .finally(() => setLoadingJobs(false));
  }, []);

  // Initialize selected job from URL slug or query param
  useEffect(() => {
    if (jobsList.length === 0) return;

    let targetJob = null;
    if (slug) {
      targetJob = jobsList.find((j) => j.slug === slug || j.id === slug || j._id === slug);
    }

    const queryRole = searchParams.get("role");
    if (!targetJob && queryRole) {
      targetJob = jobsList.find(
        (j) => j.title.toLowerCase() === queryRole.toLowerCase() || j.slug === queryRole
      );
    }

    if (targetJob) {
      setFormData((prev) => ({
        ...prev,
        jobId: targetJob._id || targetJob.id || targetJob.slug,
        jobTitle: targetJob.title,
      }));
    } else if (jobsList.length > 0) {
      setFormData((prev) => ({
        ...prev,
        jobId: prev.jobId || jobsList[0]._id || jobsList[0].id || jobsList[0].slug,
        jobTitle: prev.jobTitle || jobsList[0].title,
      }));
    }
  }, [slug, searchParams, jobsList]);

  // Handle Role Dropdown Change
  const handleRoleChange = (e) => {
    const selectedTitle = e.target.value;
    const found = jobsList.find((j) => j.title === selectedTitle);
    setFormData((prev) => ({
      ...prev,
      jobTitle: selectedTitle,
      jobId: found ? found._id || found.id || found.slug : "general",
    }));
    if (errors.jobTitle) setErrors((prev) => ({ ...prev, jobTitle: "" }));
  };

  // Handle PDF File Selection & Validation
  const handleFileChange = (file) => {
    setErrors((prev) => ({ ...prev, resume: "" }));

    if (!file) return;

    // 1. Validate File Type (PDF Only)
    const isPdf =
      file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      setErrors((prev) => ({
        ...prev,
        resume: "Invalid file type. Please upload a PDF file (.pdf) only.",
      }));
      setResumeFile(null);
      setResumeData("");
      setResumeFileName("");
      setResumeSize("");
      return;
    }

    // 2. Validate File Size (Max 5MB)
    const maxSizeBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setErrors((prev) => ({
        ...prev,
        resume: "File size exceeds 5MB limit. Please upload a smaller PDF.",
      }));
      setResumeFile(null);
      setResumeData("");
      setResumeFileName("");
      setResumeSize("");
      return;
    }

    // Format file size string
    const sizeStr =
      file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
        : `${(file.size / 1024).toFixed(0)} KB`;

    setResumeFile(file);
    setResumeFileName(file.name);
    setResumeSize(sizeStr);

    // Read as Base64 data URL
    const reader = new FileReader();
    reader.onload = () => {
      setResumeData(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveFile = () => {
    setResumeFile(null);
    setResumeData("");
    setResumeFileName("");
    setResumeSize("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Drag and Drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  // Form Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full Name is required.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address (e.g. name@domain.com).";
    }

    const phoneDigits = formData.phone.replace(/[^0-9]/g, "");
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (phoneDigits.length < 10) {
      newErrors.phone = "Please enter a valid phone number (at least 10 digits).";
    }

    if (!formData.jobTitle) {
      newErrors.jobTitle = "Please select a job role.";
    }

    if (!resumeData && !resumeFile) {
      newErrors.resume = "Resume (PDF format) is required.";
    }

    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if (formData.portfolioUrl && !urlRegex.test(formData.portfolioUrl.trim())) {
      newErrors.portfolioUrl = "Please enter a valid URL (e.g. https://yourportfolio.com).";
    }

    if (formData.linkedinUrl && !urlRegex.test(formData.linkedinUrl.trim())) {
      newErrors.linkedinUrl = "Please enter a valid LinkedIn URL (e.g. https://linkedin.com/in/username).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Application
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validateForm()) {
      window.scrollTo({ top: 300, behavior: "smooth" });
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        jobId: formData.jobId || "general",
        jobTitle: formData.jobTitle,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        experience: formData.experience,
        portfolioUrl: formData.portfolioUrl.trim(),
        linkedinUrl: formData.linkedinUrl.trim(),
        coverLetter: formData.coverLetter.trim(),
        resumeFileName: resumeFileName || `${formData.name.replace(/\s+/g, "_")}_Resume.pdf`,
        resumeData: resumeData || "",
        resumeSize: resumeSize || "PDF Document",
      };

      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to submit application.");
      }

      setSubmitted(true);
      window.scrollTo({ top: 150, behavior: "smooth" });
    } catch (err) {
      setServerError(err.message || "An error occurred while submitting. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHero
        num="Careers"
        label="Apply Now"
        title={["Join Our Team,", formData.jobTitle || "Apply for Role"]}
        sub="Submit your details, select your preferred role, and upload your resume. We look forward to seeing your work!"
      >
        <Breadcrumb
          items={[
            { label: "Home", to: "/" },
            { label: "Careers", to: "/careers" },
            { label: `Apply — ${formData.jobTitle || "Role"}` },
          ]}
        />
      </PageHero>

      <section className="section wrap" style={{ paddingTop: 24, paddingBottom: 80 }}>
        <div style={{ maxWidth: "780px", margin: "0 auto" }}>
          {submitted ? (
            /* Success Card */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="form-card-box"
              style={{ textAlign: "center" }}
            >
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "50%",
                  background: "rgba(16, 185, 129, 0.15)",
                  color: "#10b981",
                  fontSize: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 24px",
                }}
              >
                ✓
              </div>

              <h2 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "12px", color: "#12385F" }}>
                Application Submitted Successfully!
              </h2>

              <p style={{ fontSize: "16px", color: "#536E8C", lineHeight: 1.6, maxWidth: "520px", margin: "0 auto 28px" }}>
                Thank you, <strong>{formData.name}</strong>. We have received your application for the{" "}
                <strong style={{ color: "var(--accent)" }}>{formData.jobTitle}</strong> position. Our recruiting team will review your profile and reach out to you within 48 hours.
              </p>

              <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                <Link to="/careers" className="btn btn-solid">
                  ← Back to Open Roles
                </Link>
                <Link to="/" className="btn btn-line">
                  Visit Homepage
                </Link>
              </div>
            </motion.div>
          ) : (
            /* Application Form Card */
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="form-card-box"
            >
              <div style={{ marginBottom: "28px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <span className="mini-tag accent-tag">Application Form</span>
                  <span className="mini-tag">Full-time / Remote</span>
                </div>
                <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#12385F" }}>
                  Candidate Details
                </h2>
                <p style={{ fontSize: "14px", color: "#536E8C", marginTop: "4px" }}>
                  Please fill out the fields below. Fields marked with <span style={{ color: "#ef4444" }}>*</span> are required.
                </p>
              </div>

              {serverError && (
                <div
                  style={{
                    background: "rgba(239, 68, 68, 0.08)",
                    border: "1px solid rgba(239, 68, 68, 0.3)",
                    color: "#dc2626",
                    padding: "14px 18px",
                    borderRadius: "12px",
                    marginBottom: "24px",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  <span style={{ marginRight: 6 }}>•</span> {serverError}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                {/* 1. Job Role Dropdown */}
                <div style={{ marginBottom: "22px" }}>
                  <label style={{ display: "block", fontSize: "13.5px", fontWeight: 700, marginBottom: "8px", color: "#12385F" }}>
                    Applying for Role <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <select
                    value={formData.jobTitle}
                    onChange={handleRoleChange}
                    style={{
                      width: "100%",
                      padding: "13px 16px",
                      borderRadius: "12px",
                      background: "#ffffff",
                      border: errors.jobTitle ? "1.5px solid #ef4444" : "1.5px solid rgba(18, 56, 95, 0.18)",
                      color: "#12385F",
                      fontSize: "15px",
                      fontWeight: 600,
                      outline: "none",
                      appearance: "none",
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2312385F' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 16px center",
                      paddingRight: "40px",
                    }}
                  >
                    {jobsList.map((j) => (
                      <option key={j._id || j.id || j.slug} value={j.title}>
                        {j.title} ({j.dept || "Engineering"} · {j.location || "Coimbatore"})
                      </option>
                    ))}
                    <option value="General Application">
                      General Speculative Application (Other Role)
                    </option>
                  </select>
                  {errors.jobTitle && (
                    <div style={{ color: "#ef4444", fontSize: "12px", marginTop: "6px", fontWeight: 600 }}>
                      {errors.jobTitle}
                    </div>
                  )}
                </div>

                {/* 2. Full Name & Email */}
                <div className="form-row-2col">
                  <div>
                    <label style={{ display: "block", fontSize: "13.5px", fontWeight: 700, marginBottom: "8px", color: "#12385F" }}>
                      Full Name <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: "" });
                      }}
                      style={{
                        width: "100%",
                        padding: "13px 16px",
                        borderRadius: "12px",
                        background: "#ffffff",
                        border: errors.name ? "1.5px solid #ef4444" : "1.5px solid rgba(18, 56, 95, 0.18)",
                        color: "#12385F",
                        fontSize: "15px",
                        outline: "none",
                      }}
                    />
                    {errors.name && (
                      <div style={{ color: "#ef4444", fontSize: "12px", marginTop: "6px", fontWeight: 600 }}>
                        {errors.name}
                      </div>
                    )}
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "13.5px", fontWeight: 700, marginBottom: "8px", color: "#12385F" }}>
                      Email Address <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: "" });
                      }}
                      style={{
                        width: "100%",
                        padding: "13px 16px",
                        borderRadius: "12px",
                        background: "#ffffff",
                        border: errors.email ? "1.5px solid #ef4444" : "1.5px solid rgba(18, 56, 95, 0.18)",
                        color: "#12385F",
                        fontSize: "15px",
                        outline: "none",
                      }}
                    />
                    {errors.email && (
                      <div style={{ color: "#ef4444", fontSize: "12px", marginTop: "6px", fontWeight: 600 }}>
                        {errors.email}
                      </div>
                    )}
                  </div>
                </div>

                {/* 3. Phone Number & Experience */}
                <div className="form-row-2col">
                  <div>
                    <label style={{ display: "block", fontSize: "13.5px", fontWeight: 700, marginBottom: "8px", color: "#12385F" }}>
                      Phone Number <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: "" });
                      }}
                      style={{
                        width: "100%",
                        padding: "13px 16px",
                        borderRadius: "12px",
                        background: "#ffffff",
                        border: errors.phone ? "1.5px solid #ef4444" : "1.5px solid rgba(18, 56, 95, 0.18)",
                        color: "#12385F",
                        fontSize: "15px",
                        outline: "none",
                      }}
                    />
                    {errors.phone && (
                      <div style={{ color: "#ef4444", fontSize: "12px", marginTop: "6px", fontWeight: 600 }}>
                        {errors.phone}
                      </div>
                    )}
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "13.5px", fontWeight: 700, marginBottom: "8px", color: "#12385F" }}>
                      Experience Level <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "13px 16px",
                        borderRadius: "12px",
                        background: "#ffffff",
                        border: "1.5px solid rgba(18, 56, 95, 0.18)",
                        color: "#12385F",
                        fontSize: "15px",
                        outline: "none",
                        appearance: "none",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2312385F' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 16px center",
                        paddingRight: "40px",
                      }}
                    >
                      {EXPERIENCE_LEVELS.map((exp) => (
                        <option key={exp} value={exp}>
                          {exp}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 4. Portfolio URL & LinkedIn URL */}
                <div className="form-row-2col">
                  <div>
                    <label style={{ display: "block", fontSize: "13.5px", fontWeight: 700, marginBottom: "8px", color: "#12385F" }}>
                      Portfolio / GitHub URL <span style={{ color: "#536E8C", fontWeight: 400 }}>(Optional)</span>
                    </label>
                    <input
                      type="url"
                      placeholder="https://github.com/username or yoursite.com"
                      value={formData.portfolioUrl}
                      onChange={(e) => {
                        setFormData({ ...formData, portfolioUrl: e.target.value });
                        if (errors.portfolioUrl) setErrors({ ...errors, portfolioUrl: "" });
                      }}
                      style={{
                        width: "100%",
                        padding: "13px 16px",
                        borderRadius: "12px",
                        background: "#ffffff",
                        border: errors.portfolioUrl ? "1.5px solid #ef4444" : "1.5px solid rgba(18, 56, 95, 0.18)",
                        color: "#12385F",
                        fontSize: "15px",
                        outline: "none",
                      }}
                    />
                    {errors.portfolioUrl && (
                      <div style={{ color: "#ef4444", fontSize: "12px", marginTop: "6px", fontWeight: 600 }}>
                        {errors.portfolioUrl}
                      </div>
                    )}
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "13.5px", fontWeight: 700, marginBottom: "8px", color: "#12385F" }}>
                      LinkedIn Profile <span style={{ color: "#536E8C", fontWeight: 400 }}>(Optional)</span>
                    </label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/username"
                      value={formData.linkedinUrl}
                      onChange={(e) => {
                        setFormData({ ...formData, linkedinUrl: e.target.value });
                        if (errors.linkedinUrl) setErrors({ ...errors, linkedinUrl: "" });
                      }}
                      style={{
                        width: "100%",
                        padding: "13px 16px",
                        borderRadius: "12px",
                        background: "#ffffff",
                        border: errors.linkedinUrl ? "1.5px solid #ef4444" : "1.5px solid rgba(18, 56, 95, 0.18)",
                        color: "#12385F",
                        fontSize: "15px",
                        outline: "none",
                      }}
                    />
                    {errors.linkedinUrl && (
                      <div style={{ color: "#ef4444", fontSize: "12px", marginTop: "6px", fontWeight: 600 }}>
                        {errors.linkedinUrl}
                      </div>
                    )}
                  </div>
                </div>

                {/* 5. Resume / PDF Upload */}
                <div style={{ marginBottom: "24px" }}>
                  <label style={{ display: "block", fontSize: "13.5px", fontWeight: 700, marginBottom: "8px", color: "#12385F" }}>
                    Upload Resume (PDF Only, Max 5MB) <span style={{ color: "#ef4444" }}>*</span>
                  </label>

                  <input
                    type="file"
                    ref={fileInputRef}
                    accept=".pdf,application/pdf"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileChange(e.target.files[0]);
                      }
                    }}
                  />

                  {!resumeFile ? (
                    <div
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current && fileInputRef.current.click()}
                      style={{
                        border: errors.resume ? "2px dashed #ef4444" : "2px dashed rgba(8, 125, 193, 0.3)",
                        borderRadius: "16px",
                        padding: "30px 20px",
                        textAlign: "center",
                        background: "rgba(8, 125, 193, 0.03)",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div style={{ display: "inline-flex", justifyContent: "center", marginBottom: "8px", color: "var(--accent)" }}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                          <polyline points="14 2 14 8 20 8"/>
                          <line x1="16" x2="8" y1="13" y2="13"/>
                          <line x1="16" x2="8" y1="17" y2="17"/>
                        </svg>
                      </div>
                      <div style={{ fontSize: "15px", fontWeight: 700, color: "#12385F", marginBottom: "4px" }}>
                        Click to browse or drag &amp; drop your resume
                      </div>
                      <div style={{ fontSize: "12.5px", color: "#536E8C" }}>
                        Supported format: <strong>.PDF</strong> (Maximum file size: 5MB)
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "16px 20px",
                        borderRadius: "14px",
                        background: "rgba(16, 185, 129, 0.08)",
                        border: "1px solid rgba(16, 185, 129, 0.3)",
                        flexWrap: "wrap",
                        gap: "10px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                        <div
                          style={{
                            width: "42px",
                            height: "42px",
                            borderRadius: "10px",
                            background: "rgba(16, 185, 129, 0.2)",
                            color: "#10b981",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "14px",
                            fontWeight: 800,
                          }}
                        >
                          PDF
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: "14.5px", color: "#12385F" }}>
                            {resumeFileName}
                          </div>
                          <div style={{ fontSize: "12px", color: "#536E8C", marginTop: "2px" }}>
                            {resumeSize} • Verified PDF Ready for submission
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleRemoveFile}
                        style={{
                          background: "rgba(239, 68, 68, 0.1)",
                          border: "1px solid rgba(239, 68, 68, 0.3)",
                          color: "#ef4444",
                          padding: "6px 12px",
                          borderRadius: "8px",
                          fontSize: "12px",
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        ✕ Remove
                      </button>
                    </div>
                  )}

                  {errors.resume && (
                    <div style={{ color: "#ef4444", fontSize: "12px", marginTop: "6px", fontWeight: 600 }}>
                      {errors.resume}
                    </div>
                  )}
                </div>

                {/* 6. Cover Letter / Message */}
                <div style={{ marginBottom: "28px" }}>
                  <label style={{ display: "block", fontSize: "13.5px", fontWeight: 700, marginBottom: "8px", color: "#12385F" }}>
                    Cover Note / Tell Us About Yourself <span style={{ color: "#536E8C", fontWeight: 400 }}>(Optional)</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us why you're interested in Nexprobyte and highlight relevant projects or experiences..."
                    value={formData.coverLetter}
                    onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "13px 16px",
                      borderRadius: "12px",
                      background: "#ffffff",
                      border: "1.5px solid rgba(18, 56, 95, 0.18)",
                      color: "#12385F",
                      fontSize: "15px",
                      outline: "none",
                      resize: "vertical",
                      lineHeight: 1.6,
                    }}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-solid"
                  style={{
                    width: "100%",
                    padding: "16px",
                    fontSize: "15px",
                    fontWeight: 800,
                    justifyContent: "center",
                    cursor: submitting ? "not-allowed" : "pointer",
                    opacity: submitting ? 0.7 : 1,
                  }}
                >
                  {submitting ? "Submitting Application to Database..." : "Submit Application →"}
                </button>
              </form>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
