<?php

class Mail 
{
    public $result;
    
 
    public function __construct($mailTo, $from, $subject, $message, $file = false)      
    { 
        global $mysqli; // заводим базу в область видимости
                
        $mailTo = $mysqli->real_escape_string($mailTo);
        $separator = "---"; // разделитель в письме

        // Заголовки для письма
        $headers = "MIME-Version: 1.0\r\n";
        $headers .= "From: $from\nReply-To: $from\n"; // задаем от кого письмо
        $headers .= "Content-Type:text/plain; charset=\"utf-8\"\n"; // кодировка письма
        $headers.= "Content-Transfer-Encoding: 64bit\n\n"; // задаем конвертацию письма
        // если письмо с вложением
        if($file){
            $bodyMail = "--$separator\n"; // начало тела письма, выводим разделитель
            $bodyMail .= $message."\n"; // добавляем текст письма
            $bodyMail .= "--$separator\n";
            $fileRead = fopen($file, "r"); // открываем файл
            $contentFile = fread($fileRead, filesize($file)); // считываем его до конца
            fclose($fileRead); // закрываем файл
            $bodyMail .= "Content-Type: application/octet-stream; name==?utf-8?B?".base64_encode(basename($file))."?=\n"; 
            $bodyMail .= "Content-Transfer-Encoding: base64\n"; // кодировка файла
            $bodyMail .= "Content-Disposition: attachment; filename==?utf-8?B?".base64_encode(basename($file))."?=\n\n";
            $bodyMail .= chunk_split(base64_encode($contentFile))."\n"; // кодируем и прикрепляем файл
            $bodyMail .= "--".$separator ."--\n";
        // письмо без вложения
        }else{
            $bodyMail = "--$separator\n"; // начало тела письма, выводим разделитель
            $bodyMail .= $message."\n"; // добавляем текст письма
            $bodyMail .= "--$separator\n";
        }

        
        $this->result= mail($mailTo, $subject, $bodyMail, $headers); // отправка письма
      
        // $this->result = true;

    }


}