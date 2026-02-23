const CURR_EPOCH = 1771742961559;
const TIMESTAMP_BITS = 42;
const WORKER_ID_BITS = 10;
const SEQUENCE_BITS = 12;
const MAX_WORKER_ID = Math.pow(2, WORKER_ID_BITS) - 1;
const MAX_SEQUENCE = Math.pow(2, SEQUENCE_BITS) - 1;
const WORKER_ID = parseInt(process.env.WORKER_ID || "0");
if (isNaN(WORKER_ID)) {
  throw new Error("Worker ID must be a number");
}
if (WORKER_ID < 0 || WORKER_ID > MAX_WORKER_ID) {
  throw new Error("Worker ID must be between 0 and " + MAX_WORKER_ID);
}

export class Snowflake {
  private lastTimestamp: number = CURR_EPOCH;
  private sequence: number = 0;

  public generateId(): string {
    // Timestamp
    let currentTimestamp = Date.now();
    if (currentTimestamp < this.lastTimestamp) {
      throw new Error("Clock moved backwards");
    }

    const timestamp = currentTimestamp - CURR_EPOCH;

    // Sequence
    if (currentTimestamp === this.lastTimestamp) {
      if (this.sequence >= MAX_SEQUENCE) {
        throw new Error("Sequence overflow");
      }
      this.sequence = (this.sequence + 1) & MAX_SEQUENCE;
    } else {
      this.sequence = 0;
    }
    this.lastTimestamp = currentTimestamp;

    const timestampString = timestamp.toString(2).padStart(TIMESTAMP_BITS, "0");
    const workerIdString = WORKER_ID.toString(2).padStart(WORKER_ID_BITS, "0");
    const sequenceString = this.sequence
      .toString(2)
      .padStart(SEQUENCE_BITS, "0");

    // Return the snowflake
    return "0" + timestampString + workerIdString + sequenceString;
  }
}
