import { RocketService } from './rocket.service';


export enum RocketStatus {
  READY = 'ready',
  LAUNCHED = 'launched',
  EXPLODED = 'exploded',
  SELF_DESTROYED = 'self-destroyed',
  FAILED = 'failed',
  SUCCEED = 'succeed',
}


export class Rocket {
  static STATUSES = RocketStatus;
  status: RocketStatus = RocketStatus.READY;

  // Mass
  mass = 0;

  // Engine and fuel
  thrust = 0;
  thrustPercentage = 0;
  fuelMass = 0;
  fuelPercentage = 0;
  massFlow = 0;

  // Acceleration
  accelerationX = 0;
  accelerationY = 0;

  // Velocity
  velocityX = 0;
  velocityY = 0;

  // Position
  altitude = 0;
  position = 0;

  // Gyro
  angle = 0;

  // Flight information
  flightTime = 0;
  vibration = 0;
  gravityForce = 0;
  drag = 0;

  // Charts
  altitudeOverTime = [{ name: 'Altitude', series: [] }];
  positionOverTime = [{ name: 'Position', series: [] }];
  fuelOverTime = [{ name: 'Fuel', series: [] }];

  constructor(
    private service: RocketService,
    public uuid: string,
  ) { }

  deploySatellite(): void {
    this.service.deploySatellite(this).subscribe();
  }

  increaseThrust(): void {
    this.service.increaseThrust(this).subscribe();
  }

  decreaseThrust(): void {
    this.service.decreaseThrust(this).subscribe();
  }

  rotateLeft(): void {
    this.service.rotateLeft(this).subscribe();
  }

  rotateRight(): void {
    this.service.rotateRight(this).subscribe();
  }

  selfDestroy(): void {
    this.service.selfDestroyRocket(this).subscribe();
  }

  /** Websocket: update rocket attributes from websocket */
  update(message: any): void {
    const data = message.data;
    this.status = data.status;

    // TODO: seria mais divertido se corresse o objeto e procura-se os arrays ao invés de pegar um a um =)
    const obj = {
      ...data,
      ...this.getRepeatedValue(data.gps),
      ...this.getRepeatedValue(data.gyro),
      ...this.getRepeatedValue(data.accelerometer)
    };

    // Desse modo, se o serviço devolver algum campo a mais, basta declara-lo
    Object.keys(obj).forEach(key => {
      this[this.toLowerCamelCase(key)] = obj[key];
    });

    // Don't change code from here
    this.updateChartsData();
  }

  private toLowerCamelCase(str: string) {
    return str
      .split('_')
      .map((item, index) => {
        if (index === 0) { return item; }
        return item.charAt(0).toUpperCase() + item.substr(1);
      })
      .join('');
  }

  private getRepeatedValue(arr: any[]) {
    const field = Object.keys(arr[0])[0];
    const res = arr.reduce((acumulator, item) => {
      acumulator[item[field]] = ++acumulator[item[field]] || 1;
      return acumulator;
    }, {});

    return arr.find(item => item[field] === +Object.keys(res).find(key => res[key] === 2))
  }

  private updateChartsData() {
    this.altitudeOverTime[0].series.push({ value: this.altitude, name: this.flightTime });
    this.altitudeOverTime = [...this.altitudeOverTime];

    this.positionOverTime[0].series.push({ value: this.position, name: this.flightTime });
    this.positionOverTime = [...this.positionOverTime];

    this.fuelOverTime[0].series.push({ value: this.fuelPercentage * 100, name: this.flightTime });
    this.fuelOverTime = [...this.fuelOverTime];
  }
}
