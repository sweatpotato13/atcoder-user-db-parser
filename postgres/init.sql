DROP TABLE public.userinfo;

CREATE TABLE public.userinfo
(
    rank integer NOT NULL,
    "user" text COLLATE pg_catalog."default" NOT NULL,
    birth integer NOT NULL,
    rating integer NOT NULL,
    highest integer NOT NULL,
    match integer NOT NULL,
    win integer NOT NULL,
    CONSTRAINT userinfo_pkey PRIMARY KEY ("user")
)

TABLESPACE pg_default;

ALTER TABLE public.userinfo
    OWNER to postgres;