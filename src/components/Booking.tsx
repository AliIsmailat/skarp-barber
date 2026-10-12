import { useEffect, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent, ReactNode } from "react";
import {
  ANY_BARBER,
  addDays,
  getSlots,
  parseDateKey,
  toDateKey,
} from "../booking";
import { buttonClasses } from "../buttonStyles";
import { site } from "../content";
import { SectionHeading } from "./SectionHeading";

interface FormState {
  service: string;
  barber: string;
  people: string;
  slots: string[];
  name: string;
  phone: string;
  email: string;
}

type ErrorKey = "time" | "name" | "phone" | "email";
type Errors = Partial<Record<ErrorKey, string>>;

const errorTargets: Record<ErrorKey, string> = {
  time: "bok-tid",
  name: "bok-namn",
  phone: "bok-telefon",
  email: "bok-epost",
};

const initialState: FormState = {
  service: "0",
  barber: ANY_BARBER,
  people: "1",
  slots: [],
  name: "",
  phone: "",
  email: "",
};

const arrowClass =
  "flex h-11 w-11 items-center justify-center border border-bone-muted/60 text-xl transition-colors hover:border-brass hover:text-brass disabled:cursor-not-allowed disabled:border-line disabled:text-bone-muted/40 disabled:hover:border-line disabled:hover:text-bone-muted/40";

const stepClass =
  "flex h-[3.125rem] w-12 shrink-0 items-center justify-center border border-bone-muted/60 text-xl transition-colors hover:border-brass hover:text-brass disabled:cursor-not-allowed disabled:border-line disabled:text-bone-muted/40 disabled:hover:border-line disabled:hover:text-bone-muted/40";

const cellClass =
  "flex h-9 w-full items-center justify-center rounded-ui border text-base font-semibold transition-colors";

const labelClass =
  "block text-sm font-semibold uppercase tracking-[0.2em] text-bone-muted";

const inputClass =
  "mt-2 block w-full rounded-ui border border-bone-muted/60 bg-ink px-4 py-3 text-base text-bone placeholder:text-bone-muted/70 focus:border-brass";

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}

function Field({ id, label, error, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {children}
      {error && (
        <p
          id={`${id}-fel`}
          className="mt-2 border-l-2 border-brass pl-3 text-sm font-semibold"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export function Booking() {
  const { booking, services, about } = site;
  const [now] = useState(() => new Date());
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [confirmed, setConfirmed] = useState<FormState | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [cancelled, setCancelled] = useState(false);
  const [editCount, setEditCount] = useState(0);
  const summaryRef = useRef<HTMLDivElement>(null);
  const confirmRef = useRef<HTMLHeadingElement>(null);
  const scheduleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (confirmed) confirmRef.current?.focus();
  }, [confirmed, cancelled]);

  useEffect(() => {
    if (editCount > 0) scheduleRef.current?.focus();
  }, [editCount]);

  useEffect(() => {
    if (attempt > 0) summaryRef.current?.focus();
  }, [attempt]);

  const [week, setWeek] = useState(0);
  const [activeKey, setActiveKey] = useState("");
  const cellRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const service = services.items[Number(form.service)];
  const peopleCount = Number(form.people);
  const maxPeople = about.barbers.length;

  const changePeople = (value: number) => {
    const next = Math.min(maxPeople, Math.max(1, value));
    update({ people: String(next), slots: form.slots.slice(-next) });
  };
  const lastWeek = Math.floor(booking.daysAhead / 7);
  const weekStart = addDays(now, week * 7);

  const days = Array.from({ length: 7 }, (_, index) => {
    const date = addDays(weekStart, index);
    const key = toDateKey(date);
    const inRange = index + week * 7 <= booking.daysAhead;
    const list = inRange
      ? getSlots(key, service.duration, form.barber, now)
      : [];
    return {
      key,
      open: list.length > 0,
      weekday: date
        .toLocaleDateString("sv-SE", { weekday: "short" })
        .replace(".", ""),
      number: date.getDate(),
      label: date.toLocaleDateString("sv-SE", {
        weekday: "long",
        day: "numeric",
        month: "long",
      }),
      slots: new Map(list.map((slot) => [slot.time, slot])),
    };
  });

  const times = [
    ...new Set(days.flatMap((day) => [...day.slots.keys()])),
  ].sort();

  const rangeLabel = `${weekStart.toLocaleDateString("sv-SE", { day: "numeric", month: "short" })} - ${addDays(weekStart, 6).toLocaleDateString("sv-SE", { day: "numeric", month: "short" })}`;

  const exists = (col: number, row: number) =>
    col >= 0 &&
    col < 7 &&
    row >= 0 &&
    row < times.length &&
    days[col].slots.has(times[row]);

  const firstSelected = days
    .flatMap((day, col) =>
      form.slots
        .filter((entry) => entry.startsWith(`${day.key}|`))
        .map((entry) => `${col}-${times.indexOf(entry.split("|")[1])}`),
    )
    .find((key) => {
      const [col, row] = key.split("-").map(Number);
      return exists(col, row);
    });
  const firstCol = days.findIndex((day) => day.open);
  const fallbackKey =
    firstSelected ??
    (firstCol >= 0
      ? `${firstCol}-${times.findIndex((time) => days[firstCol].slots.has(time))}`
      : "");
  const [activeCol, activeRow] = activeKey.split("-").map(Number);
  const focusKey = exists(activeCol, activeRow) ? activeKey : fallbackKey;

  const onCellKey = (
    event: KeyboardEvent<HTMLButtonElement>,
    col: number,
    row: number,
  ) => {
    const steps: Record<string, [number, number]> = {
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
      ArrowUp: [0, -1],
      ArrowDown: [0, 1],
    };
    const step = steps[event.key];
    if (!step) return;
    event.preventDefault();
    let nextCol = col + step[0];
    let nextRow = row + step[1];
    while (
      nextCol >= 0 &&
      nextCol < 7 &&
      nextRow >= 0 &&
      nextRow < times.length
    ) {
      if (exists(nextCol, nextRow)) {
        cellRefs.current[`${nextCol}-${nextRow}`]?.focus();
        return;
      }
      nextCol += step[0];
      nextRow += step[1];
    }
  };

  const changeWeek = (direction: number) =>
    setWeek((current) => current + direction);

  const formatSlot = (entry: string) => {
    const [dateKey, time] = entry.split("|");
    return `${parseDateKey(dateKey).toLocaleDateString("sv-SE", { weekday: "long", day: "numeric", month: "long" })} ${time}`;
  };

  const chosenList = [...form.slots].sort();

  const toggleSlot = (entry: string) =>
    setForm((current) => {
      if (current.slots.includes(entry)) {
        return {
          ...current,
          slots: current.slots.filter((item) => item !== entry),
        };
      }
      const limit = Number(current.people);
      return { ...current, slots: [...current.slots, entry].slice(-limit) };
    });

  const update = (patch: Partial<FormState>) =>
    setForm((current) => ({ ...current, ...patch }));

  const validate = (): Errors => {
    const next: Errors = {};

    if (form.slots.length < peopleCount) {
      next.time =
        peopleCount > 1 ? booking.errors.timeMore : booking.errors.time;
    }
    if (form.name.trim().length < 2) next.name = booking.errors.name;
    if (form.phone.replace(/\D/g, "").length < 6)
      next.phone = booking.errors.phone;
    if (form.email.trim() !== "" && !/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      next.email = booking.errors.email;
    }

    return next;
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = validate();
    setErrors(next);

    if (Object.keys(next).length > 0) {
      setAttempt((current) => current + 1);
      return;
    }

    setConfirmed(form);
  };

  const edit = () => {
    if (!confirmed) return;
    setForm({ ...confirmed, slots: [] });
    setErrors({});
    setWeek(0);
    setConfirmed(null);
    setCancelled(false);
    setEditCount((current) => current + 1);
  };

  const cancel = () => setCancelled(true);

  const reset = () => {
    setCancelled(false);
    setForm(initialState);
    setWeek(0);
    setErrors({});
    setConfirmed(null);
  };

  const errorEntries = Object.entries(errors) as [ErrorKey, string][];

  const describedBy = (key: ErrorKey, id: string) =>
    errors[key] ? `${id}-fel` : undefined;

  const renderCancelled = () => (
    <div className="mt-12 border border-brass p-6 sm:p-10 lg:max-w-3xl">
      <h3 ref={confirmRef} tabIndex={-1} className="text-4xl sm:text-5xl">
        {booking.cancelled.title}
      </h3>
      <p className="mt-4 text-lg text-bone-muted">
        {booking.cancelled.message}
      </p>
      <p className="mt-6 text-sm text-bone-muted">{booking.demoNote}</p>
      <button
        type="button"
        onClick={reset}
        className={`${buttonClasses()} mt-8`}
      >
        {booking.cancelled.again}
      </button>
    </div>
  );

  const renderConfirmation = (data: FormState) => {
    const chosen = services.items[Number(data.service)];
    const rows: [string, string][] = [
      [booking.labels.service, chosen.name],
      [
        booking.labels.barber,
        data.barber === ANY_BARBER ? booking.anyBarber : data.barber,
      ],
      [booking.labels.people, data.people],
      ...[...data.slots]
        .sort()
        .map((entry, index): [string, string] => [
          data.slots.length > 1
            ? `${booking.labels.time} ${index + 1}`
            : booking.labels.time,
          formatSlot(entry),
        ]),
      [booking.confirm.price, `${chosen.price * Number(data.people)} kr`],
    ];

    return (
      <div className="mt-12 border border-brass p-6 sm:p-10 lg:max-w-3xl">
        <h3 ref={confirmRef} tabIndex={-1} className="text-4xl sm:text-5xl">
          {booking.confirm.title}
        </h3>
        <p className="mt-4 text-lg text-bone-muted">
          {booking.confirm.thanks} {data.name.trim()}! {booking.confirm.message}
        </p>
        <dl className="mt-8 divide-y divide-line border-y border-line">
          {rows.map(([label, value]) => (
            <div key={label} className="flex justify-between gap-6 py-3">
              <dt className="text-bone-muted">{label}</dt>
              <dd className="text-right font-semibold first-letter:uppercase">
                {value}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-sm text-bone-muted">{booking.demoNote}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={edit} className={buttonClasses()}>
            {booking.confirm.edit}
          </button>
          <button
            type="button"
            onClick={cancel}
            className={buttonClasses("outline")}
          >
            {booking.confirm.cancel}
          </button>
          <button
            type="button"
            onClick={reset}
            className={buttonClasses("outline")}
          >
            {booking.confirm.again}
          </button>
        </div>
      </div>
    );
  };

  return (
    <section
      id="boka"
      aria-labelledby="boka-rubrik"
      className="border-t border-brass/40 bg-ink py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          id="boka-rubrik"
          eyebrow={booking.eyebrow}
          title={booking.title}
        />
        <p className="mt-6 max-w-xl text-lg text-bone-muted">{booking.intro}</p>

        {confirmed ? (
          cancelled ? (
            renderCancelled()
          ) : (
            renderConfirmation(confirmed)
          )
        ) : (
          <form
            noValidate
            onSubmit={onSubmit}
            className="mt-12 grid grid-cols-1 gap-8 lg:max-w-4xl"
          >
            <div
              ref={summaryRef}
              tabIndex={-1}
              role="alert"
              className="empty:hidden"
            >
              {errorEntries.length > 0 && (
                <div className="border border-brass p-5">
                  <p className="font-display text-2xl font-bold uppercase tracking-wide">
                    {booking.errorTitle}
                  </p>
                  <ul role="list" className="mt-3 grid gap-1">
                    {errorEntries.map(([key, message]) => (
                      <li key={key}>
                        <a
                          href={`#${errorTargets[key]}`}
                          className="underline underline-offset-4 hover:text-brass"
                        >
                          {message}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              <Field id="bok-tjanst" label={booking.labels.service}>
                <select
                  id="bok-tjanst"
                  value={form.service}
                  onChange={(event) =>
                    update({ service: event.target.value, slots: [] })
                  }
                  className={inputClass}
                >
                  {services.items.map((item, index) => (
                    <option key={item.name} value={index}>
                      {item.name} ({item.price} kr, {item.duration} min)
                    </option>
                  ))}
                </select>
              </Field>

              <Field id="bok-frisor" label={booking.labels.barber}>
                <select
                  id="bok-frisor"
                  value={form.barber}
                  onChange={(event) =>
                    update({ barber: event.target.value, slots: [] })
                  }
                  className={inputClass}
                >
                  <option value={ANY_BARBER}>{booking.anyBarber}</option>
                  {about.barbers.map((barber) => (
                    <option key={barber.name} value={barber.name}>
                      {barber.name}
                    </option>
                  ))}
                </select>
              </Field>
              <div>
                <span id="bok-personer-label" className={labelClass}>
                  {booking.labels.people}
                </span>
                <div
                  role="group"
                  aria-labelledby="bok-personer-label"
                  aria-describedby="bok-personer-info"
                  className="mt-2 flex"
                >
                  <button
                    type="button"
                    onClick={() => changePeople(peopleCount - 1)}
                    disabled={peopleCount <= 1}
                    aria-label={booking.people.decrease}
                    className={stepClass}
                  >
                    <span aria-hidden="true">&minus;</span>
                  </button>
                  <output
                    aria-live="polite"
                    className="flex flex-1 items-center justify-center border-y border-bone-muted/60 text-lg font-semibold tabular-nums"
                  >
                    {peopleCount}
                    <span className="sr-only">
                      {" "}
                      {peopleCount === 1
                        ? booking.people.one
                        : booking.people.many}
                    </span>
                  </output>
                  <button
                    type="button"
                    onClick={() => changePeople(peopleCount + 1)}
                    disabled={peopleCount >= maxPeople}
                    aria-label={booking.people.increase}
                    className={stepClass}
                  >
                    <span aria-hidden="true">+</span>
                  </button>
                </div>
                <p
                  id="bok-personer-info"
                  className="mt-2 text-sm text-bone-muted"
                >
                  {booking.people.hint}
                </p>
              </div>
            </div>

            <div
              id="bok-tid"
              ref={scheduleRef}
              tabIndex={-1}
              className="min-w-0"
            >
              <h3 className={labelClass}>{booking.schedule.title}</h3>

              <div className="mt-3 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => changeWeek(-1)}
                  disabled={week === 0}
                  aria-label={booking.schedule.prevWeek}
                  className={arrowClass}
                >
                  <span aria-hidden="true">&larr;</span>
                </button>
                <p className="text-center font-display text-xl font-bold uppercase tracking-wide">
                  {rangeLabel}
                </p>
                <button
                  type="button"
                  onClick={() => changeWeek(1)}
                  disabled={week >= lastWeek}
                  aria-label={booking.schedule.nextWeek}
                  className={arrowClass}
                >
                  <span aria-hidden="true">&rarr;</span>
                </button>
              </div>

              <div className="mt-4 overflow-x-auto border border-line">
                <table
                  aria-label={booking.schedule.title}
                  className="w-full border-collapse text-center"
                >
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="sticky left-0 z-10 w-14 bg-ink p-0"
                      >
                        <span className="sr-only">{booking.labels.time}</span>
                      </th>
                      {days.map((day) => (
                        <th
                          key={day.key}
                          scope="col"
                          className={`min-w-[3.25rem] border-l border-line px-1 py-2 font-normal ${day.open ? "" : "text-bone-muted/60"}`}
                        >
                          <span className="block text-xs uppercase tracking-[0.15em] text-bone-muted">
                            {day.weekday}
                          </span>
                          <span className="block text-lg font-semibold tabular-nums">
                            {day.number}
                          </span>
                          {!day.open && (
                            <span className="block text-[0.65rem] uppercase tracking-wider">
                              {booking.schedule.closed}
                            </span>
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {times.map((time, row) => (
                      <tr key={time} className="border-t border-line">
                        <th
                          scope="row"
                          className="sticky left-0 z-10 bg-ink px-2 text-sm font-normal tabular-nums text-bone-muted"
                        >
                          {time}
                        </th>
                        {days.map((day, col) => {
                          const slot = day.slots.get(time);
                          if (!slot) {
                            return (
                              <td
                                key={day.key}
                                className="border-l border-line bg-surface/40"
                              />
                            );
                          }
                          const cellKey = `${col}-${row}`;
                          const entry = `${day.key}|${time}`;
                          const isSelected = form.slots.includes(entry);
                          const state = isSelected
                            ? booking.schedule.selected
                            : slot.available
                              ? booking.schedule.free
                              : booking.schedule.taken;
                          return (
                            <td
                              key={day.key}
                              className="border-l border-line p-1"
                            >
                              <button
                                type="button"
                                ref={(node) => {
                                  cellRefs.current[cellKey] = node;
                                }}
                                tabIndex={cellKey === focusKey ? 0 : -1}
                                aria-pressed={
                                  slot.available ? isSelected : undefined
                                }
                                aria-disabled={
                                  slot.available ? undefined : true
                                }
                                aria-label={`${day.label} ${time}, ${state}`}
                                onFocus={() => setActiveKey(cellKey)}
                                onKeyDown={(event) =>
                                  onCellKey(event, col, row)
                                }
                                onClick={() => {
                                  if (slot.available) toggleSlot(entry);
                                }}
                                className={`${cellClass} ${
                                  isSelected
                                    ? "border-brass bg-brass text-ink"
                                    : slot.available
                                      ? "cursor-pointer border-bone-muted/60 hover:border-brass hover:bg-brass/20"
                                      : "cursor-not-allowed border-line bg-surface text-bone-muted/40"
                                }`}
                              >
                                <span aria-hidden="true">
                                  {isSelected
                                    ? "\u2713"
                                    : slot.available
                                      ? ""
                                      : "\u00d7"}
                                </span>
                              </button>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <ul
                role="list"
                className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-bone-muted"
              >
                <li className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="h-5 w-5 border border-bone-muted/60"
                  />
                  {booking.schedule.free}
                </li>
                <li className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="h-5 w-5 border border-brass bg-brass"
                  />
                  {booking.schedule.selected}
                </li>
                <li className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="flex h-5 w-5 items-center justify-center border border-line bg-surface text-xs text-bone-muted/40"
                  >
                    &times;
                  </span>
                  {booking.schedule.taken}
                </li>
              </ul>
              <p className="mt-3 text-sm text-bone-muted">
                {booking.schedule.hint}
              </p>

              <div
                aria-live="polite"
                className="mt-4 border-l-2 border-brass pl-3"
              >
                <p className="font-semibold">
                  {chosenList.length === 0
                    ? booking.schedule.none
                    : `${booking.schedule.chosen}: ${chosenList.length} ${booking.schedule.of} ${peopleCount}`}
                </p>
                {chosenList.length > 0 && (
                  <ul
                    role="list"
                    className="mt-2 grid gap-1 text-bone-muted first-letter:uppercase"
                  >
                    {chosenList.map((entry) => (
                      <li key={entry} className="first-letter:uppercase">
                        {formatSlot(entry)}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {errors.time && (
                <p
                  id="bok-tid-fel"
                  className="mt-3 border-l-2 border-brass pl-3 text-sm font-semibold"
                >
                  {errors.time}
                </p>
              )}
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                id="bok-namn"
                label={booking.labels.name}
                error={errors.name}
              >
                <input
                  id="bok-namn"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={(event) => update({ name: event.target.value })}
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={describedBy("name", "bok-namn")}
                  className={inputClass}
                />
              </Field>

              <Field
                id="bok-telefon"
                label={booking.labels.phone}
                error={errors.phone}
              >
                <input
                  id="bok-telefon"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  value={form.phone}
                  onChange={(event) => update({ phone: event.target.value })}
                  aria-invalid={errors.phone ? true : undefined}
                  aria-describedby={describedBy("phone", "bok-telefon")}
                  className={inputClass}
                />
              </Field>
            </div>

            <div className="sm:max-w-md">
              <Field
                id="bok-epost"
                label={booking.labels.email}
                error={errors.email}
              >
                <input
                  id="bok-epost"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(event) => update({ email: event.target.value })}
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={describedBy("email", "bok-epost")}
                  className={inputClass}
                />
              </Field>
            </div>

            <div>
              <button
                type="submit"
                className={`${buttonClasses()} w-full sm:w-auto`}
              >
                {booking.submitLabel}
              </button>
              <p className="mt-4 text-sm text-bone-muted">{booking.demoNote}</p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
