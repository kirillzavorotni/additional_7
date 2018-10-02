module.exports = function solveSudoku(matrix){
    // итерируемся по ячейкам пока не найдем значение 0
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            if(matrix[i][j] !== 0) continue;
            let numbers = getNumber(matrix, i, j);          // ищем претендентов для ячейки
            for(let l = 0; l < numbers.length; l++){        
                matrix[i][j] = numbers[l];                  // если притенденты есть вставляем первый и итерируемся заново
                if(solveSudoku(matrix)) {                   // если далее притенденты подходят
                    return matrix;
                }
            }
            matrix[i][j] = 0;                               // иначе сбрасываем текущую ячейку на 0
            return false;                                   // возвращаем ложь
        }
    }
    return matrix;
};

// поиск претендентов для нужной ячейки
function getNumber(matrix, i, j){
    let numbers = [1,2,3,4,5,6,7,8,9];
    let valOfField = [];                                    // стек для временного хранения значений из под-полей 
    // расчет массива для под-полей
    let row_index = (i >= 0 && i < 3) ? [0,1,2] :
                    (i > 2 && i < 6) ? [3,4,5] : [6,7,8];
    let col_index = (j >= 0 && j < 3) ? [0,1,2] :
                    (j > 2 && j < 6) ? [3,4,5] : [6,7,8];
    // находим все значения под-полей
    for(let l = 0; l < 3; l++){
        for(let p = 0; p < 3; p++){
            valOfField.push(matrix[row_index[l]][col_index[p]]);
        }
    }
    // фильтруем массив претендентов ячейки
    numbers = numbers.filter(function(item){
        for(let t = 0; t < 9; t++){
            if(item === matrix[i][t]){
                return false;
            }
            if(item === matrix[t][j]){
                return false;
            }
        }
        if(valOfField.indexOf(item) !== -1){
            return false;
        }
        return true;
    });
    return numbers;
}