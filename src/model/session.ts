interface SessionModel {
  id: number;
  room: RoomModel;
  guest: GuestModel;
  status: "active" | "inactive" | "error" | "finished";
}