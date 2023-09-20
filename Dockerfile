FROM oven/bun

ADD src src
ADD package.json package.json
ADD bun.lockb bun.lockb
RUN bun install

CMD bun run dev

EXPOSE 3000