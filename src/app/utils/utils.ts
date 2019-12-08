export class Utils {

    private static letters = '0123456789ABCDEF'.split('');

    static getRandomColor(): string {
        let color = '#';
        for (let i = 0; i < 6; i++) {
            if (i <= 2) {
                color += Utils.letters[Math.floor(Math.random() * 16)];
            } else {
                color += Utils.letters[Math.floor(Math.random() * 16)];
            }
        }
        console.log('color is: ' + color);
        return color;
    }
}
