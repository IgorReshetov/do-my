
# get_question(id вопроса тек.уровня, id последнего ответа, id дерева)

#call `get_question`(null, null, 2) # 8
#call get_answer(8, 2)       # 5 6
      # да
# call `get_question`(8, 5, 2) # 9
# call get_answer(9, 2) # 11

# call get_question(9, 5, 2)
# call get_answer(11, 2)

# call get_question(11, NULL, 2) # 12
# call get_answer(11, 2)

# call get_question(12, NULL, 2) #13
# call get_answer(12, 2)

# call get_question(13, NULL, 2) #13
      # нет
# call get_question(8, 6, 2) # 10
# call `get_answer`(10, 2)

# call get_question(10, 5, 2) # 14
# call `get_answer`(14, 2)

# call get_question(14, 5, 2) #16
# call `get_answer`(16, 2)




