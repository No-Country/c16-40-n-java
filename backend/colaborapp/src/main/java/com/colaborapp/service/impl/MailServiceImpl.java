package com.colaborapp.service.impl;

import com.colaborapp.dto.Mail;
import com.colaborapp.service.MailService;
import com.colaborapp.utils.ApiUtil;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
@Slf4j
@RequiredArgsConstructor
public class MailServiceImpl implements MailService {
    private final JavaMailSender javaMailSender;
    private final TemplateEngine templateEngine;

    @Override
    public void sendMail(Mail mail) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, ApiUtil.ENCODING);
            helper.setTo(mail.to());
            helper.setSubject(mail.subject());
            Context context = new Context();
            context.setVariable("message", mail.content());
            String htmlContent = templateEngine.process("mail", context);
            helper.setText(htmlContent, true);
            javaMailSender.send(message);
        } catch (MessagingException ex) {
            log.error("An error occur when trying to send mail to '{}'. Error: {}", mail.subject(), ex.getMessage());
        }
    }
}
