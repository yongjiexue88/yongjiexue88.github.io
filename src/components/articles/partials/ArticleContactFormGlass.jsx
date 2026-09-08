import "./ArticleContactFormGlass.scss"
import React from 'react'
import { useLanguage } from "/src/providers/LanguageProvider.jsx"
import StandardButton from "/src/components/buttons/StandardButton.jsx"

export default function ArticleContactFormGlass({ name, setName, email, setEmail, subject, setSubject, message, setMessage }) {
    const language = useLanguage()
    const isZh = language.selectedLanguageId === "zh"

    return (
        <div className="contact-glass-parallax-wrapper">
            <div className="contact-glass-container">
                <h3 className="contact-glass-title">
                    {isZh ? "发送消息" : "Send a message"}
                </h3>

                <div className="contact-glass-form-group">
                    <i className="fa-solid fa-user contact-glass-icon"></i>
                    <input 
                        type="text" 
                        className="contact-glass-input" 
                        aria-label={isZh ? "姓名" : "Your name"}
                        placeholder={isZh ? "姓名" : "Your name"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="contact-glass-form-group">
                    <i className="fa-solid fa-envelope contact-glass-icon"></i>
                    <input 
                        type="email" 
                        className="contact-glass-input" 
                        aria-label={isZh ? "电子邮箱" : "Email address"}
                        placeholder={isZh ? "电子邮箱" : "Email address"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="contact-glass-form-group contact-glass-form-group-subject">
                    <i className="fa-solid fa-tag contact-glass-icon"></i>
                    <input
                        type="text"
                        className="contact-glass-input"
                        aria-label={isZh ? "主题" : "Subject"}
                        placeholder={isZh ? "主题" : "Subject"}
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                    />
                </div>

                <div className="contact-glass-form-group-textarea">
                    <textarea 
                        className="contact-glass-input" 
                        aria-label={isZh ? "消息" : "Message"}
                        placeholder={isZh ? "消息" : "Message"}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={5}
                        required
                    />
                </div>

                <div className="contact-glass-submit-wrapper">
                    <StandardButton 
                        type="submit"
                        variant="primary"
                        faIcon="fa-solid fa-paper-plane"
                        label={isZh ? "发送消息" : "Send message"}
                        className="contact-glass-submit-btn"
                    />
                </div>
            </div>
        </div>
    )
}
