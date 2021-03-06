PGDMP                 	        y           school    13.3    13.2 +    ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ?           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ?           1262    16404    school    DATABASE     j   CREATE DATABASE school WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1255';
    DROP DATABASE school;
                postgres    false            ?            1259    16520    homework    TABLE     9  CREATE TABLE public.homework (
    id integer NOT NULL,
    courseid integer NOT NULL,
    title character varying(255) NOT NULL,
    description character varying(8191),
    deadline character varying(255) NOT NULL,
    createdat character varying(255) NOT NULL,
    updatedat character varying(255) NOT NULL
);
    DROP TABLE public.homework;
       public         heap    postgres    false            ?            1259    16526    Homework_id_seq    SEQUENCE     ?   CREATE SEQUENCE public."Homework_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;
 (   DROP SEQUENCE public."Homework_id_seq";
       public          postgres    false    200            ?           0    0    Homework_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Homework_id_seq" OWNED BY public.homework.id;
          public          postgres    false    201            ?            1259    16528    comment    TABLE     k  CREATE TABLE public.comment (
    id integer NOT NULL,
    authorid integer NOT NULL,
    authorfullname character varying(255) NOT NULL,
    authortype character varying(255) NOT NULL,
    submissionid integer NOT NULL,
    createdat character varying(255) NOT NULL,
    updatedat character varying(255) NOT NULL,
    content character varying(1023) NOT NULL
);
    DROP TABLE public.comment;
       public         heap    postgres    false            ?            1259    16534    course    TABLE       CREATE TABLE public.course (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description character varying(8191),
    points real NOT NULL,
    createdat character varying(255) NOT NULL,
    updatedat character varying(255) NOT NULL
);
    DROP TABLE public.course;
       public         heap    postgres    false            ?            1259    16540    course_file    TABLE     @  CREATE TABLE public.course_file (
    id integer NOT NULL,
    path character varying(255) NOT NULL,
    course_id integer NOT NULL,
    mimetype character varying(255) NOT NULL,
    title character varying(255) NOT NULL,
    created_at character varying(255) NOT NULL,
    updated_at character varying(255) NOT NULL
);
    DROP TABLE public.course_file;
       public         heap    postgres    false            ?            1259    16546    courseparticipants    TABLE     ?   CREATE TABLE public.courseparticipants (
    personid integer NOT NULL,
    courseid integer NOT NULL,
    createdat character varying(255) NOT NULL,
    updatedat character varying(255) NOT NULL,
    id character varying(512) NOT NULL
);
 &   DROP TABLE public.courseparticipants;
       public         heap    postgres    false            ?            1259    16552    homework_file    TABLE     D  CREATE TABLE public.homework_file (
    id integer NOT NULL,
    path character varying(255) NOT NULL,
    homework_id integer NOT NULL,
    mimetype character varying(255) NOT NULL,
    title character varying(255) NOT NULL,
    created_at character varying(255) NOT NULL,
    updated_at character varying(255) NOT NULL
);
 !   DROP TABLE public.homework_file;
       public         heap    postgres    false            ?            1259    16558    person    TABLE     E  CREATE TABLE public.person (
    id integer NOT NULL,
    fname character varying(255) NOT NULL,
    lname character varying(255) NOT NULL,
    password character varying(1023) NOT NULL,
    type character varying(255) NOT NULL,
    createdat character varying(255) NOT NULL,
    updatedat character varying(255) NOT NULL
);
    DROP TABLE public.person;
       public         heap    postgres    false            ?            1259    16564 
   submission    TABLE     R  CREATE TABLE public.submission (
    id integer NOT NULL,
    studentid integer NOT NULL,
    homeworkid integer NOT NULL,
    grade integer,
    status character varying(255),
    createdat character varying(255) NOT NULL,
    updatedat character varying(255) NOT NULL,
    graderid integer,
    graderfullname character varying(255)
);
    DROP TABLE public.submission;
       public         heap    postgres    false            ?            1259    16570    submissionfile    TABLE     F  CREATE TABLE public.submissionfile (
    id integer NOT NULL,
    path character varying(511) NOT NULL,
    created_at character varying(255) NOT NULL,
    updated_at character varying(255) NOT NULL,
    submissionid integer NOT NULL,
    mimetype character varying(255) NOT NULL,
    title character varying(255) NOT NULL
);
 "   DROP TABLE public.submissionfile;
       public         heap    postgres    false            K           2604    16637    homework id    DEFAULT     l   ALTER TABLE ONLY public.homework ALTER COLUMN id SET DEFAULT nextval('public."Homework_id_seq"'::regclass);
 :   ALTER TABLE public.homework ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    201    200            ?          0    16528    comment 
   TABLE DATA           x   COPY public.comment (id, authorid, authorfullname, authortype, submissionid, createdat, updatedat, content) FROM stdin;
    public          postgres    false    202   ?8       ?          0    16534    course 
   TABLE DATA           V   COPY public.course (id, title, description, points, createdat, updatedat) FROM stdin;
    public          postgres    false    203   ?8       ?          0    16540    course_file 
   TABLE DATA           c   COPY public.course_file (id, path, course_id, mimetype, title, created_at, updated_at) FROM stdin;
    public          postgres    false    204   !:       ?          0    16546    courseparticipants 
   TABLE DATA           Z   COPY public.courseparticipants (personid, courseid, createdat, updatedat, id) FROM stdin;
    public          postgres    false    205   ?:       ?          0    16520    homework 
   TABLE DATA           d   COPY public.homework (id, courseid, title, description, deadline, createdat, updatedat) FROM stdin;
    public          postgres    false    200   ?A       ?          0    16552    homework_file 
   TABLE DATA           g   COPY public.homework_file (id, path, homework_id, mimetype, title, created_at, updated_at) FROM stdin;
    public          postgres    false    206    B       ?          0    16558    person 
   TABLE DATA           X   COPY public.person (id, fname, lname, password, type, createdat, updatedat) FROM stdin;
    public          postgres    false    207   ?C       ?          0    16564 
   submission 
   TABLE DATA           ~   COPY public.submission (id, studentid, homeworkid, grade, status, createdat, updatedat, graderid, graderfullname) FROM stdin;
    public          postgres    false    208   ?D       ?          0    16570    submissionfile 
   TABLE DATA           i   COPY public.submissionfile (id, path, created_at, updated_at, submissionid, mimetype, title) FROM stdin;
    public          postgres    false    209   ?E       ?           0    0    Homework_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Homework_id_seq"', 3, false);
          public          postgres    false    201            O           2606    16578    comment Comment_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.comment
    ADD CONSTRAINT "Comment_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.comment DROP CONSTRAINT "Comment_pkey";
       public            postgres    false    202            U           2606    16580 *   courseparticipants CourseParticipants_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.courseparticipants
    ADD CONSTRAINT "CourseParticipants_pkey" PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.courseparticipants DROP CONSTRAINT "CourseParticipants_pkey";
       public            postgres    false    205            Q           2606    16582    course Course_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.course
    ADD CONSTRAINT "Course_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.course DROP CONSTRAINT "Course_pkey";
       public            postgres    false    203            ]           2606    16584 &   submissionfile HomeworkFile_copy1_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.submissionfile
    ADD CONSTRAINT "HomeworkFile_copy1_pkey" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.submissionfile DROP CONSTRAINT "HomeworkFile_copy1_pkey";
       public            postgres    false    209            M           2606    16586    homework Homework_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.homework
    ADD CONSTRAINT "Homework_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.homework DROP CONSTRAINT "Homework_pkey";
       public            postgres    false    200            Y           2606    16588    person Person_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.person
    ADD CONSTRAINT "Person_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.person DROP CONSTRAINT "Person_pkey";
       public            postgres    false    207            [           2606    16590    submission Submission_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.submission
    ADD CONSTRAINT "Submission_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.submission DROP CONSTRAINT "Submission_pkey";
       public            postgres    false    208            S           2606    16592    course_file course_file_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.course_file
    ADD CONSTRAINT course_file_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.course_file DROP CONSTRAINT course_file_pkey;
       public            postgres    false    204            W           2606    16594     homework_file homework_file_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.homework_file
    ADD CONSTRAINT homework_file_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.homework_file DROP CONSTRAINT homework_file_pkey;
       public            postgres    false    206            b           2606    16595    courseparticipants CourseId    FK CONSTRAINT     ?   ALTER TABLE ONLY public.courseparticipants
    ADD CONSTRAINT "CourseId" FOREIGN KEY (courseid) REFERENCES public.course(id) ON UPDATE CASCADE ON DELETE CASCADE;
 G   ALTER TABLE ONLY public.courseparticipants DROP CONSTRAINT "CourseId";
       public          postgres    false    2897    203    205            ^           2606    16600    homework CourseId    FK CONSTRAINT     ?   ALTER TABLE ONLY public.homework
    ADD CONSTRAINT "CourseId" FOREIGN KEY (courseid) REFERENCES public.course(id) ON UPDATE CASCADE ON DELETE CASCADE;
 =   ALTER TABLE ONLY public.homework DROP CONSTRAINT "CourseId";
       public          postgres    false    200    203    2897            d           2606    16605    submission HomeWorkId    FK CONSTRAINT     ?   ALTER TABLE ONLY public.submission
    ADD CONSTRAINT "HomeWorkId" FOREIGN KEY (homeworkid) REFERENCES public.homework(id) ON UPDATE CASCADE ON DELETE CASCADE;
 A   ALTER TABLE ONLY public.submission DROP CONSTRAINT "HomeWorkId";
       public          postgres    false    200    2893    208            c           2606    16610    courseparticipants PersonId    FK CONSTRAINT     ?   ALTER TABLE ONLY public.courseparticipants
    ADD CONSTRAINT "PersonId" FOREIGN KEY (personid) REFERENCES public.person(id) ON UPDATE CASCADE ON DELETE CASCADE;
 G   ALTER TABLE ONLY public.courseparticipants DROP CONSTRAINT "PersonId";
       public          postgres    false    205    207    2905            e           2606    16615    submission PersonId    FK CONSTRAINT     ?   ALTER TABLE ONLY public.submission
    ADD CONSTRAINT "PersonId" FOREIGN KEY (studentid) REFERENCES public.person(id) ON UPDATE CASCADE ON DELETE CASCADE;
 ?   ALTER TABLE ONLY public.submission DROP CONSTRAINT "PersonId";
       public          postgres    false    208    2905    207            _           2606    16620    comment authoridfk    FK CONSTRAINT     ?   ALTER TABLE ONLY public.comment
    ADD CONSTRAINT authoridfk FOREIGN KEY (authorid) REFERENCES public.person(id) ON UPDATE CASCADE ON DELETE CASCADE;
 <   ALTER TABLE ONLY public.comment DROP CONSTRAINT authoridfk;
       public          postgres    false    202    207    2905            a           2606    16625    course_file course_id_fk    FK CONSTRAINT     ?   ALTER TABLE ONLY public.course_file
    ADD CONSTRAINT course_id_fk FOREIGN KEY (course_id) REFERENCES public.course(id) ON UPDATE CASCADE ON DELETE CASCADE;
 B   ALTER TABLE ONLY public.course_file DROP CONSTRAINT course_id_fk;
       public          postgres    false    2897    204    203            `           2606    16630    comment subidfk    FK CONSTRAINT     ?   ALTER TABLE ONLY public.comment
    ADD CONSTRAINT subidfk FOREIGN KEY (submissionid) REFERENCES public.submission(id) ON UPDATE CASCADE ON DELETE CASCADE;
 9   ALTER TABLE ONLY public.comment DROP CONSTRAINT subidfk;
       public          postgres    false    202    208    2907            ?   e   x?3?4202?J?K,ITpJ?,IML?H-?4?44040022?0?50?5?14?24?20?j??-????P?_??`??eH?FFzf?fXl?I??s??qqq ?C+Q      ?     x?u??j? ????S? ???ƻ?Mo??b?n?;?a?(ư?_Z?fz#?~z??c]??[x????P9?A??R,x????І?F%l?d????(?`3??.X???D3%???[ 6[w?ڶ?`K?a?d:ӑ2??3u???a?5?!????FzVT?)5'^I`m?????7uwO??+?	?S ֈ'??ַU[??vK???>?W?b75|?r?S ????X?x?/??4Q,M?z$?bẦA????K5?໶r4x?5?
??㰩??)?OF??͝I      ?   q   x????
?0 ?ɿl??6?O%P?j5?@????E?6à?k*<??j?>???}}???@?????8?u????O??ZS??K~???pft??@?G?)???2Ƞ????.?      ?   ?  x??XMn?;[w?E?d???9f5??-??????Ϋ _y?6A &,E?(:?C?ſ!.??I?l?Q?????Yô?ӊVHS?di5J??r?Vc???N7v??n?ԝ?!]???T??j?Ǌ??땽??dN??/?aFR?jW?֚???f???郙߱?z?1??T??4??Th-?%?<???o?W?Ծ?TTk?e?v?L?S?Csa????^????o?tIâ??Z???q?,?BNeUg???D?SӇ????`6|̨$?eR?	?x?R?-?='???{yh?0?φ???????M[x??C????]???b3?a??6?^?}O,?z>?????^??`tC?\?sN?vL??$
6}&?+??????޿^'瘷???wn?J)?R?=?????m?7?h?\G?{????
ѧ?n?y?%gWo??:????:Yk?L*?::E?t?'{??G??'?|r?(??? ????5a??1????[R??v:????S3/ ?b?N?????Iluu??VOg.?rc߀r?\? ?Y??𳦵?p??qr?z???^o? ?SI????F*??k?4rM?9???????n? tD??C??mV??:?Q?,r????_?G?,aѨY??p=?S????%????$?+??????ͱ??Bgp?-؎h??FM?ة??n???P,Z???+?3??(??d?K?:.??y??b???
c???b????b?0C??L?V??3p??۞???????+w;?t????~{????:1锂ڵ!m???!G????9? l?A .1?>?LU?HУ?"???gWo엾???:??Cop????	a'?Գ??N&?MUnSP???@iW[?l5??
[?c?????$|r?????P?????'???H?v<~????????g??5E?@gp??/\?^<!K?ֿ|????z??lܥ ?dΨ}6?[?s`8???y?~c??o@9??e?1yg1Ԯ>(?Ƣ????Q??37??#?u????3)%?"Bcᜬ??fr???~??|tc1傓??]5db
m?G??iz|?֙?"_@??!ˠ?G??Q{????Œ???g?n???7?:gC???]-Bu 7a??L#O?i)?J?I2????S?/`)??)vHl'=h?Id2?9?9?:S???s?/??Dl?J8	??.??@4?2?G?7?箾 m?OF??E?=??t???`U$???[g????Fn?zO?j?I?????iʹ???jN?(N?q1,}߷i??'!?~?E?؟o?0??}?{??U<j:??bhL?ʰ??b7????  ?w???W?B?0	Hzj?0???7?g?2#????4?B?$?3?U9????D???7?_????D ?5??:?5|!׊(?lj???y???^??:(??<???????;4????To??v?????u???s???&x-?u?[g?M?p?x?X??Ӈ?B????2HZS=???????>?????????^#ql???i̿?????g??"Slہ??]ik?|q?x??||???wN?`??&#-Ͱ=r??a??qDX????3????v ?g?@??2^
?®?????Z??Cs?^~??ϴ?ĳ?/ ??}?VK??Icm??r??R?:8???^n?Б??~Qz?"?(4?9?Xk??7?????Qr$l&jw?%?3K?uT?????<???+3?kZ^??Ǝ?e?1qr?]k???3??ι?Y0$???l?ɫ??G?7?g?y?YS*?=?????????@C????߿?E???      ?   L   x?3?4?L,.?L??M?+Q0??H???W?4202?50?5414?2 "=?(???%X????D????W? -b       ?   ?  x????n?0F??w?????
^????Ԁ[????i??????u,?O%X?w?k???[TD.f???M?5??N?i?ʢ?ñ?7O篏1???`U??5)?f???? Z???/sB?/|Wh?3A??.??D?|????s??[???_}???{?7??????&B?P??Β?@??$Y????+?ȧ>̕p???f???f??P??
K?3????2??n<??òO?h??????l??<ln6???????/???m???e?Н??Z?l?Y????"T2??H?}e.??W??X????r;Ps|?D?@????߂?G??UIH?A???p????3?p???*?̦X?{<?ĺ??ӱ9?EL???
Vu׵?????zz:??c?G???? ?(??f?m
!?Zn?      ?   -  x?u??J?0???)|??$i??*
???????h-?6?????҃m.!3??1!??P?};,?@	o(O?XV??9orPu?>????i?
???G?.?8???˓Жs??F??A ?DWx|??-?:?霡?w?%??7?HpK˄&?TL`??? h
????????窴8?!???A?pߵ???????8?n?ϡ??t?6?0???z???{????5?r?[??p??5?7?TMO5?f?T%??1? ???e 8΋??_LԒ???K?^?????ʔ??Zm?[???eY? v?_      ?   ?   x???A
?0??ur
/??f?4?P7DE7???Y۔n??0H?Q???rs?k}??B)@??&??? ?o??ŗ?z*?R??X??FJ*?bM:?3:???
4???-?|hǷa?'??I??'?~??qÿ??e?X]      ?   ?   x????j?@E???ɹ???w?$B?Dc%??????,E?y\??:?ms?b??5
?x??ɲ&wn?/~?z??)]??6f???Pj?? ??ټ:h?E?A?~?]{zi???
b,=??5;o?AC\??vݕ?F*хB??]Q???[ ه쌊?T???s?f???ԏm\tL]{Y???Cߦe?R\?????V?/????x??<? ?,?s???????K?Ϙ??R?\?     