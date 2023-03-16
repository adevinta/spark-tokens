//
//  BorderView.swift
//  SparkTokensDemo
//
//

import Foundation
import SwiftUI
import SparkTokens

struct BorderRow: View {
    var label: String
    var color: Color
    
    var body: some View {
        ZStack {
            HStack {
                VStack(alignment: .leading) {
                    Text(label)
                }.padding(Size.paddingMd)
                Spacer()
            }
            .border(color, width:Size.borderWidthMd)
        }
        .padding(.top, Size.paddingMd)
        .padding(.leading, Size.paddingMd)
        .padding(.trailing, Size.paddingMd)
    }
}

struct BorderView: View {
    var body: some View {
        ZStack {
            ScrollView {
                VStack {
                    // SwiftUI has a maximum of 10 children...
                    Group {
                        BorderRow(label:"Primary", color:Color.brandPrimary)
                        BorderRow(label:"Secondary", color:Color.brandSecondary)
                    }
                    
                    Group {
                        BorderRow(label:"Success", color:Color.brandSuccess)
                        BorderRow(label:"Alert", color:Color.brandAlert)
                        BorderRow(label:"Error", color:Color.brandError)
                        BorderRow(label:"Info", color:Color.brandInfo)
                        BorderRow(label:"Neutral", color:Color.brandNeutral)
                    }
                    
                }
            }
        }
        .navigationBarTitle("Border Colors")
        .frame(minWidth: 0, maxWidth: .infinity, minHeight: 0, maxHeight: .infinity)
        .background(Color.brandOnPrimary)
//        .edgesIgnoringSafeArea(.all)
    }
}

struct BorderView_Previews: PreviewProvider {
    static var previews: some View {
        BorderView()
    }
}

