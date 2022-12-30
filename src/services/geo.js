export default class Geolocation {
    position = { latitude: 0, longitude: 0 };
    geo_options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };

    getLocation = async() => {
        if (navigator.geolocation) {
            const pos = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, this.geo_options);
            });
            this.position.latitude = pos.coords.latitude;
            this.position.longitude = pos.coords.longitude;
        }
        return this.position;
    };

}